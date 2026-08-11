import type { ForgeProject } from "./model";

export type BundleKind = "wsgref" | "wsgpack";

interface BundleEnvelope {
  format: BundleKind;
  codec: "wsg-obfuscation-v1";
  access: "editable" | "read_only";
  exportedAt: string;
  payload: unknown;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function checksum(bytes: Uint8Array) {
  const source = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  const digest = await crypto.subtle.digest("SHA-256", source);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
}

function octalEncode(bytes: Uint8Array) {
  return [...bytes]
    .map((value) => value.toString(8).padStart(3, "0"))
    .join("")
    .replace(/[0-7]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) + 1));
}

function octalDecode(value: string) {
  const raw = value.replace(/[1-8]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) - 1));
  if (raw.length % 3) throw new Error("Invalid WSG payload length");
  const bytes = new Uint8Array(raw.length / 3);
  for (let index = 0; index < raw.length; index += 3) {
    const byte = Number.parseInt(raw.slice(index, index + 3), 8);
    if (!Number.isFinite(byte) || byte > 255) throw new Error("Invalid WSG octal payload");
    bytes[index / 3] = byte;
  }
  return bytes;
}

export function referencePayload(project: ForgeProject) {
  return {
    schemaVersion: project.schemaVersion,
    namespace: project.namespace,
    version: project.reference.version,
    reference: project.reference,
    categories: project.categories,
    atomics: project.atomics,
    references: project.references,
    influences: project.influences,
    templates: project.templates,
    previousIds: [...project.atomics, ...project.references, ...project.templates, ...project.influences].flatMap((item) => item.previousIds ?? []),
  };
}

export function packPayload(project: ForgeProject) {
  return {
    schemaVersion: project.schemaVersion,
    namespace: project.namespace,
    version: project.pack.version,
    pack: project.pack,
    entities: project.entities,
  };
}

export async function encodeBundle(project: ForgeProject, kind: BundleKind, access: "editable" | "read_only") {
  const envelope: BundleEnvelope = {
    format: kind,
    codec: "wsg-obfuscation-v1",
    access,
    exportedAt: new Date().toISOString(),
    payload: kind === "wsgref" ? referencePayload(project) : packPayload(project),
  };
  const bytes = encoder.encode(JSON.stringify(envelope));
  return `WSG1|${await checksum(bytes)}|${octalEncode(bytes)}`;
}

export async function decodeBundle(source: string) {
  const [magic, expected, encoded] = source.trim().split("|", 3);
  if (magic !== "WSG1" || !expected || !encoded) throw new Error("Unknown or damaged WSG file header");
  const bytes = octalDecode(encoded);
  const actual = await checksum(bytes);
  const envelope = JSON.parse(decoder.decode(bytes)) as BundleEnvelope;
  if (!["wsgref", "wsgpack"].includes(envelope.format)) throw new Error("Unsupported WSG bundle type");
  return { envelope, verified: actual === expected };
}

export function downloadText(filename: string, text: string, type = "application/octet-stream") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

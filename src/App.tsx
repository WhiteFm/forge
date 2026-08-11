import { useEffect, useMemo, useRef, useState } from "react";
import EntityEditor from "./EntityEditor";
import { createEntity, entityTypeLabels, entityTypes, initialProject, normalizeProject } from "./data";
import type { EntityType, ForgeEntity, ForgeProject } from "./types";
import { useUi } from "./ui-i18n";
import { toCanonicalPack, validateProject } from "./validation";

const STORAGE_KEY = "wsguild.forge.project.v1";
const BUNDLED_PROJECT_URL = new URL("../projects/srd52-wizard-evoker.forge.json", import.meta.url).href;

function loadProject(): ForgeProject {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return normalizeProject(JSON.parse(saved) as ForgeProject);
  } catch { /* start with a valid empty project */ }
  return initialProject;
}

function downloadJson(filename: string, value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function useAutoFitText(locale: string) {
  useEffect(() => {
    const selector = [".primary-button", ".ghost-button", ".secondary-button", ".add-card-button", ".text-action", ".project-chip", ".section-toggle", ".entity-picker-trigger", ".workspace-actions button", ".issue-scope button", ".project-modal footer button", ".nav-sidebar nav > button", ".class-progression th", ".field > span", ".field > legend", ".levels-head > *"].join(",");
    let frame = 0;
    const fit = () => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        element.style.fontSize = "";
        let size = Number.parseFloat(getComputedStyle(element).fontSize);
        const minimum = element.matches(".class-progression th") ? 6 : 8;
        while (size > minimum && (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight)) {
          size -= 0.5;
          element.style.fontSize = `${size}px`;
        }
      });
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit); };
    const observer = new MutationObserver(schedule);
    const shell = document.querySelector(".forge-shell");
    if (shell) observer.observe(shell, { childList: true, subtree: true, characterData: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", schedule); };
  }, [locale]);
}

export default function App() {
  const { locale, setLocale, t } = useUi();
  useAutoFitText(locale);
  const [project, setProject] = useState<ForgeProject>(loadProject);
  const [activeType, setActiveType] = useState<EntityType>(project.entities[0]?.entityType ?? "class");
  const [activeId, setActiveId] = useState(project.entities[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [rightPanel, setRightPanel] = useState<"validation" | "json">("validation");
  const [issueScope, setIssueScope] = useState<"all" | "active">("all");
  const [showRight, setShowRight] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [toastKey, setToastKey] = useState<"app.saved" | "app.savedChange" | "app.createdDraft" | "app.createdCopy" | "app.deleted" | "app.imported" | "app.importFailed">("app.saved");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...project, updatedAt: new Date().toISOString() }));
  }, [project]);

  const issues = useMemo(() => validateProject(project, locale), [project, locale]);
  const errorCount = issues.filter((issue) => issue.severity === "error").length;
  const warningCount = issues.length - errorCount;
  const activeEntity = project.entities.find((entity) => entity.id === activeId);
  const shownEntities = project.entities.filter((entity) => entity.entityType === activeType && (`${entity.localization.ru.name} ${entity.localization.en.name} ${entity.id}`).toLowerCase().includes(search.toLowerCase()));
  const visibleIssues = issueScope === "all" ? issues : issues.filter((issue) => !issue.entityId || issue.entityId === activeId);
  const canonical = useMemo(() => toCanonicalPack(project), [project]);

  function updateEntity(patch: Partial<ForgeEntity>) {
    const index = project.entities.findIndex((entity) => entity.id === activeId);
    const draft = { ...project, entities: project.entities.map((entity) => entity.id === activeId ? { ...entity, ...patch } : entity) };
    const needsIdRefresh = Boolean(patch.localization?.en?.name !== undefined || patch.choices || patch.equipmentOptions || patch.effects || patch.materialGroups);
    const next = needsIdRefresh ? normalizeProject(draft) : draft;
    setProject(next);
    if (index >= 0) setActiveId(next.entities[index].id);
    setToastKey("app.savedChange");
  }

  function addEntity(type = activeType) {
    const entity = createEntity(type, project.entities.length + 1, project.pack.id);
    setProject((current) => ({ ...current, entities: [...current.entities, entity] }));
    setActiveType(type);
    setActiveId(entity.id);
    setShowSidebar(false);
    setToastKey("app.createdDraft");
  }

  function duplicateEntity() {
    if (!activeEntity) return;
    const copy = structuredClone(activeEntity);
    copy.status = "draft";
    copy.localization.ru.name += " — копия";
    copy.localization.en.name += " — copy";
    const next = normalizeProject({ ...project, entities: [...project.entities, copy] });
    setProject(next);
    setActiveId(next.entities.at(-1)?.id ?? activeId);
    setToastKey("app.createdCopy");
  }

  function deleteEntity() {
    if (!activeEntity || !window.confirm(t("app.deleteConfirm", { name: activeEntity.localization[locale].name }))) return;
    const remaining = project.entities.filter((entity) => entity.id !== activeId);
    setProject((current) => ({ ...current, entities: remaining }));
    const next = remaining.find((entity) => entity.entityType === activeType) ?? remaining[0];
    if (next) { setActiveType(next.entityType); setActiveId(next.id); } else setActiveId("");
    setToastKey("app.deleted");
  }

  async function importProject(file: File) {
    try {
      const imported = JSON.parse(await file.text()) as ForgeProject;
      if (!imported.pack?.id || !Array.isArray(imported.entities)) throw new Error("invalid");
      const normalized = normalizeProject(imported);
      setProject(normalized);
      const first = normalized.entities[0];
      if (first) { setActiveType(first.entityType); setActiveId(first.id); }
      setToastKey("app.imported");
    } catch {
      setToastKey("app.importFailed");
    }
  }

  async function loadBundledProject() {
    try {
      const response = await fetch(BUNDLED_PROJECT_URL);
      if (!response.ok) throw new Error("download failed");
      const imported = normalizeProject(await response.json() as ForgeProject);
      setProject(imported);
      const first = imported.entities[0];
      if (first) { setActiveType(first.entityType); setActiveId(first.id); }
      setShowProject(false);
      setToastKey("app.imported");
    } catch {
      setToastKey("app.importFailed");
    }
  }

  function selectType(type: EntityType) {
    setActiveType(type);
    const first = project.entities.find((entity) => entity.entityType === type);
    if (first) setActiveId(first.id);
    setShowSidebar(false);
  }

  function openIssue(entityId?: string) {
    if (!entityId) return;
    const entity = project.entities.find((item) => item.id === entityId);
    if (!entity) return;
    setActiveType(entity.entityType);
    setActiveId(entity.id);
    setShowSidebar(false);
  }

  return <div className="forge-shell" data-locale={locale}>
    <header className="topbar">
      <button className="mobile-menu" type="button" onClick={() => setShowSidebar((value) => !value)} aria-label={t("app.openMenu")}>☰</button>
      <div className="brand"><img className="brand-mark" src={`${import.meta.env.BASE_URL}forge-logo.svg`} alt="Forge" /><span><strong>WSGuild</strong><small>{t("app.brand")}</small></span></div>
      <button className="project-chip" type="button" onClick={() => setShowProject(true)}><span>{project.pack.name}</span><small>{project.pack.version}</small></button>
      <div className="save-state"><i />{t(toastKey)}</div>
      <div className="top-actions">
        <div className="language-switch" aria-label="Language"><button className={locale === "en" ? "active" : ""} type="button" onClick={() => setLocale("en")}>EN</button><button className={locale === "ru" ? "active" : ""} type="button" onClick={() => setLocale("ru")}>RU</button></div>
        <button type="button" className="ghost-button" onClick={() => fileRef.current?.click()}>{t("app.import")}</button>
        <button type="button" className="ghost-button" onClick={() => downloadJson(`${project.pack.id}.forge.json`, normalizeProject(project))}>{t("app.project")}</button>
        <button type="button" className="primary-button" disabled={errorCount > 0} onClick={() => downloadJson(`${project.pack.id}-${project.pack.version}.wsgpack`, canonical)}>{t("app.export")}</button>
        <input ref={fileRef} hidden type="file" accept=".json,.wsgpack" onChange={(event) => { const file = event.target.files?.[0]; if (file) void importProject(file); event.target.value = ""; }} />
      </div>
    </header>

    <aside className={`nav-sidebar ${showSidebar ? "open" : ""}`}>
      <div className="nav-title"><span>{t("app.packContent")}</span><button type="button" onClick={() => addEntity()}>＋</button></div>
      <nav>{entityTypes.map((type) => { const count = project.entities.filter((entity) => entity.entityType === type).length; return <button className={activeType === type ? "active" : ""} type="button" key={type} onClick={() => selectType(type)}><span className={`entity-icon icon-${type}`}>{type.slice(0, 2).toUpperCase()}</span><strong>{entityTypeLabels[type][locale]}</strong><em>{count}</em></button>; })}</nav>
      <div className="nav-footer"><button type="button" onClick={() => { setShowRight(true); setRightPanel("validation"); }}><span className="validation-ring">{errorCount}</span><span><strong>{t("app.packValidation")}</strong><small>{t("app.counts", { errors: errorCount, warnings: warningCount })}</small></span></button></div>
    </aside>

    <aside className={`entity-sidebar ${showSidebar ? "open-list" : ""}`}>
      <div className="entity-list-head"><div><span className="eyebrow">{entityTypeLabels[activeType][locale]}</span><strong>{t("app.records", { count: shownEntities.length })}</strong></div><button className="square-button" type="button" onClick={() => addEntity(activeType)}>＋</button></div>
      <div className="search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("app.search")} /></div>
      <div className="entity-list">{shownEntities.map((entity) => { const count = issues.filter((issue) => issue.entityId === entity.id && issue.severity === "error").length; return <button className={entity.id === activeId ? "active" : ""} type="button" key={entity.id} onClick={() => { setActiveId(entity.id); setShowSidebar(false); }}><span className={`status-bar status-${entity.status}`} /><span><strong>{entity.localization[locale].name || t("app.untitled")}</strong><small>{entity.id}</small></span>{count > 0 && <b>{count}</b>}</button>; })}{shownEntities.length === 0 && <div className="empty-list"><p>{t("app.emptyList")}</p><button type="button" onClick={() => addEntity(activeType)}>{t("app.createFirstRecord")}</button></div>}</div>
    </aside>

    <main className={`workspace ${showRight ? "with-inspector" : ""}`}>
      {activeEntity ? <><div className="workspace-head"><div><span className="eyebrow">{activeEntity.entityType} · {activeEntity.status}</span><h1>{activeEntity.localization[locale].name || t("app.untitled")}</h1><code>{activeEntity.id}</code></div><div className="workspace-actions"><button type="button" onClick={duplicateEntity}>{t("app.duplicate")}</button><button className="danger-text" type="button" onClick={deleteEntity}>{t("app.delete")}</button><button className={showRight ? "active" : ""} type="button" onClick={() => setShowRight((value) => !value)}>{t("app.validation")} {issues.filter((issue) => issue.entityId === activeId).length}</button></div></div><EntityEditor entity={activeEntity} entities={project.entities} locale={locale} onLocale={setLocale} onPatch={updateEntity} /></> : <div className="empty-workspace"><img className="brand-mark large" src={`${import.meta.env.BASE_URL}forge-logo.svg`} alt="Forge" /><h1>{t("app.createFirst")}</h1><p>{t("app.emptyDescription")}</p><button className="primary-button" type="button" onClick={() => addEntity("class")}>{t("app.createClass")}</button></div>}
    </main>

    {showRight && <aside className="inspector"><header><div className="inspector-tabs"><button className={rightPanel === "validation" ? "active" : ""} type="button" onClick={() => setRightPanel("validation")}>{t("app.validation")}</button><button className={rightPanel === "json" ? "active" : ""} type="button" onClick={() => setRightPanel("json")}>JSON</button></div><button className="icon-button" type="button" onClick={() => setShowRight(false)}>×</button></header>{rightPanel === "validation" ? <div className="validation-panel"><div className={`validation-summary ${errorCount ? "has-errors" : "valid"}`}><span>{errorCount ? "!" : "✓"}</span><div><strong>{errorCount ? t("app.needsAttention") : t("app.ready")}</strong><small>{t("app.counts", { errors: errorCount, warnings: warningCount })}</small></div></div><div className="coverage"><span><strong>{Math.max(0, 100 - errorCount * 8 - warningCount * 2)}%</strong> {t("app.coverage")}</span><i><b style={{ width: `${Math.max(0, 100 - errorCount * 8 - warningCount * 2)}%` }} /></i></div><div className="issue-scope" role="group" aria-label={locale === "en" ? "Validation scope" : "Область проверки"}><button className={issueScope === "all" ? "active" : ""} type="button" onClick={() => setIssueScope("all")}>{locale === "en" ? `Whole pack (${issues.length})` : `Весь пакет (${issues.length})`}</button><button className={issueScope === "active" ? "active" : ""} type="button" onClick={() => setIssueScope("active")}>{locale === "en" ? `Current record (${issues.filter((issue) => !issue.entityId || issue.entityId === activeId).length})` : `Текущая запись (${issues.filter((issue) => !issue.entityId || issue.entityId === activeId).length})`}</button></div><div className="issues">{visibleIssues.length ? visibleIssues.map((issue, index) => <button type="button" className={`issue issue-${issue.severity}`} key={`${issue.entityId}-${issue.path}-${index}`} onClick={() => openIssue(issue.entityId)}><span>{issue.severity === "error" ? "×" : "!"}</span><div><strong>{issue.message}</strong><small>{issue.entityId ?? "manifest"} · {issue.path}</small><em>{issue.entityId ? (locale === "en" ? "Open record →" : "Открыть запись →") : (locale === "en" ? "Project setting" : "Настройка проекта")}</em></div></button>) : <div className="no-issues"><span>✓</span><p>{t("app.noIssues")}</p></div>}</div><div className="logic-note"><span>{t("app.rule")}</span><p>{t("app.ruleText")}</p></div></div> : <div className="json-panel"><div className="json-toolbar"><span>canonical-pack.json</span><button type="button" onClick={() => void navigator.clipboard.writeText(JSON.stringify(canonical, null, 2))}>{t("app.copy")}</button></div><pre>{JSON.stringify(activeEntity ? canonical.entities.find((item) => (item as { id?: string }).id === activeEntity.id) : canonical.manifest, null, 2)}</pre></div>}</aside>}

    {showProject && <div className="modal-backdrop" onMouseDown={() => setShowProject(false)}><section className="project-modal" onMouseDown={(event) => event.stopPropagation()}><header><div><span className="eyebrow">Pack</span><h2>{t("app.projectSettings")}</h2></div><button className="icon-button" type="button" onClick={() => setShowProject(false)}>×</button></header><div className="form-grid"><label className="field"><span>{t("app.packName")}</span><input value={project.pack.name} onChange={(event) => setProject({ ...project, pack: { ...project.pack, name: event.target.value } })} /></label><label className="field"><span>Pack ID</span><input value={project.pack.id} onChange={(event) => setProject({ ...project, pack: { ...project.pack, id: event.target.value } })} /></label><label className="field"><span>{t("app.version")}</span><input value={project.pack.version} onChange={(event) => setProject({ ...project, pack: { ...project.pack, version: event.target.value } })} /></label><label className="field"><span>Ruleset</span><input value={project.pack.rulesetId} onChange={(event) => setProject({ ...project, pack: { ...project.pack, rulesetId: event.target.value } })} /></label><label className="field"><span>{t("app.author")}</span><input value={project.pack.author} onChange={(event) => setProject({ ...project, pack: { ...project.pack, author: event.target.value } })} /></label><label className="field"><span>License</span><input value={project.pack.licenseId} onChange={(event) => setProject({ ...project, pack: { ...project.pack, licenseId: event.target.value } })} /></label></div><footer><button className="secondary-button" type="button" onClick={() => void loadBundledProject()}>{locale === "en" ? "Load complete SRD 5.2.1 project" : "Загрузить полный проект SRD 5.2.1"}</button><button className="ghost-button" type="button" onClick={() => { if (window.confirm(t("app.resetConfirm"))) { setProject(structuredClone(initialProject)); setActiveType("class"); setActiveId(""); setShowProject(false); } }}>{t("app.clearProject")}</button><button className="primary-button" type="button" onClick={() => { const index = project.entities.findIndex((entity) => entity.id === activeId); const normalized = normalizeProject(project); setProject(normalized); if (index >= 0) setActiveId(normalized.entities[index].id); setShowProject(false); }}>{t("app.done")}</button></footer></section></div>}
  </div>;
}

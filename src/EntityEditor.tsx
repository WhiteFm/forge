import { useState } from "react";
import { abilities, makeSubentityId } from "./data";
import {
  AbilityPicker,
  ChoicesEditor,
  ClassProgressionEditor,
  CsvInput,
  EntityQuantityList,
  Field,
  LevelsEditor,
  NumberControl,
  Section,
  Toggle,
  VisualEffectsEditor as EffectsEditor,
} from "./components";
import type { AbilityId, ForgeEntity, Locale } from "./types";
import { useUi } from "./ui-i18n";
import {
  EntityMultiPicker,
  EntityPicker,
  VisualExpressionBuilder,
  VisualExpressionList,
} from "./VisualRuleBuilder";
import { optionLabel } from "./option-labels";

interface Props {
  entity: ForgeEntity;
  entities: ForgeEntity[];
  locale: Locale;
  onLocale: (locale: Locale) => void;
  onPatch: (patch: Partial<ForgeEntity>) => void;
}

const recoveryOptions = [
  "short_rest",
  "long_rest",
  "both",
  "dawn",
  "turn_start",
  "initiative",
  "initiative_or_rest",
  "manual",
  "never",
] as const;

export default function EntityEditor({
  entity,
  entities,
  locale,
  onLocale,
  onPatch,
}: Props) {
  const { t } = useUi();
  const text = entity.localization[locale];
  const patchText = (patch: Partial<typeof text>) =>
    onPatch({
      localization: { ...entity.localization, [locale]: { ...text, ...patch } },
    });
  const choicesEditor = (
    <ChoicesEditor
      entities={entities}
      entityId={entity.id}
      choices={entity.choices ?? []}
      applications={entity.choiceApplications ?? []}
      onChange={(choices) => onPatch({ choices })}
      onApplicationsChange={(choiceApplications) =>
        onPatch({ choiceApplications })
      }
      onRemoveChoice={(choiceId) =>
        onPatch({
          choices: (entity.choices ?? []).filter(
            (choice) => choice.id !== choiceId,
          ),
          choiceApplications: (entity.choiceApplications ?? []).filter(
            (application) => application.choiceId !== choiceId,
          ),
        })
      }
    />
  );

  return (
    <div className="entity-editor">
      <Section
        eyebrow="01 · Identity"
        title={t("editor.identity")}
        actions={
          <div className="locale-tabs">
            <button
              className={locale === "en" ? "active" : ""}
              onClick={() => onLocale("en")}
              type="button"
            >
              EN
            </button>
            <button
              className={locale === "ru" ? "active" : ""}
              onClick={() => onLocale("ru")}
              type="button"
            >
              RU
            </button>
          </div>
        }
      >
        <div className="form-grid">
          <Field label={t("editor.name", { locale })} wide>
            <input
              value={text.name}
              onChange={(event) => patchText({ name: event.target.value })}
            />
          </Field>
          <Field
            label={t("editor.technicalId")}
            hint={
              locale === "en"
                ? "Generated from Pack ID, entity type, and English name"
                : "Создаётся из ID пака, типа сущности и английского названия"
            }
          >
            <input className="readonly-id" value={entity.id} readOnly />
          </Field>
          <Field label={t("editor.status")}>
            <select
              value={entity.status}
              onChange={(event) =>
                onPatch({ status: event.target.value as ForgeEntity["status"] })
              }
            >
              {["draft", "review", "published", "deprecated"].map((value) => (
                <option key={value} value={value}>
                  {optionLabel(value, locale)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("editor.description", { locale })} wide>
            <textarea
              rows={4}
              value={text.description}
              onChange={(event) =>
                patchText({ description: event.target.value })
              }
            />
          </Field>
        </div>
      </Section>

      {entity.entityType === "class" && (
        <>
          <Section eyebrow="03 · Class core" title={t("editor.classCore")}>
            <div className="form-grid three">
              <Field label={t("editor.hitDie")}>
                <select
                  value={entity.hitDie}
                  onChange={(event) =>
                    onPatch({
                      hitDie: event.target.value as ForgeEntity["hitDie"],
                    })
                  }
                >
                  {["d6", "d8", "d10", "d12"].map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </Field>
              <Field label={t("editor.casterProgression")}>
                <select
                  value={entity.casterProgression}
                  onChange={(event) =>
                    onPatch({
                      casterProgression: event.target
                        .value as ForgeEntity["casterProgression"],
                    })
                  }
                >
                  {[
                    "none",
                    "full",
                    "half_down",
                    "half_up",
                    "third",
                    "pact",
                    "custom",
                  ].map((value) => (
                    <option key={value} value={value}>
                      {optionLabel(value, locale)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("editor.spellAbility")}>
                <select
                  value={entity.spellcastingAbility}
                  onChange={(event) =>
                    onPatch({
                      spellcastingAbility: event.target.value as AbilityId | "",
                    })
                  }
                >
                  <option value="">—</option>
                  {abilities.map((ability) => (
                    <option key={ability}>{ability.toUpperCase()}</option>
                  ))}
                </select>
              </Field>
              <Field label={t("editor.primaryAbilities")} wide>
                <AbilityPicker
                  value={entity.primaryAbilities ?? []}
                  onChange={(primaryAbilities) => onPatch({ primaryAbilities })}
                />
              </Field>
              <Field
                label={t("editor.multiclassRequirement")}
                wide
                hint={t("editor.multiclassHint")}
              >
                <VisualExpressionBuilder
                  value={entity.multiclassPrerequisite ?? ""}
                  expression={entity.multiclassPrerequisiteExpression}
                  entities={entities}
                  locale={locale}
                  condition
                  onChange={(
                    multiclassPrerequisite,
                    multiclassPrerequisiteExpression,
                  ) =>
                    onPatch({
                      multiclassPrerequisite,
                      multiclassPrerequisiteExpression,
                    })
                  }
                />
              </Field>
              <Field label={t("editor.startingHp")}>
                <VisualExpressionBuilder
                  value={entity.startingHpFormula ?? ""}
                  expression={entity.startingHpExpression}
                  entities={entities}
                  locale={locale}
                  onChange={(startingHpFormula, startingHpExpression) =>
                    onPatch({ startingHpFormula, startingHpExpression })
                  }
                />
              </Field>
              <Field label={t("editor.levelHp")}>
                <VisualExpressionBuilder
                  value={entity.levelUpHpFormula ?? ""}
                  expression={entity.levelUpHpExpression}
                  entities={entities}
                  locale={locale}
                  onChange={(levelUpHpFormula, levelUpHpExpression) =>
                    onPatch({ levelUpHpFormula, levelUpHpExpression })
                  }
                />
              </Field>
              <Field label={t("editor.casterLevelFormula")}>
                <VisualExpressionBuilder
                  value={entity.casterLevelFormula ?? ""}
                  expression={entity.casterLevelExpression}
                  entities={entities}
                  locale={locale}
                  onChange={(casterLevelFormula, casterLevelExpression) =>
                    onPatch({ casterLevelFormula, casterLevelExpression })
                  }
                />
              </Field>
              <Field label={t("editor.startingProficiencies")} wide>
                <CsvInput
                  value={entity.startingProficiencies ?? []}
                  onChange={(startingProficiencies) =>
                    onPatch({ startingProficiencies })
                  }
                />
              </Field>
              <Field label={t("editor.multiclassProficiencies")} wide>
                <CsvInput
                  value={entity.multiclassProficiencies ?? []}
                  onChange={(multiclassProficiencies) =>
                    onPatch({ multiclassProficiencies })
                  }
                />
              </Field>
            </div>
          </Section>
          <Section eyebrow="04 · Progression" title={t("editor.progression")}>
            <LevelsEditor
              levels={entity.levels ?? []}
              entities={entities}
              locale={locale}
              onChange={(levels) => {
                const currentRows = entity.classProgression ?? [];
                const classProgression = levels.map((entry, index) => ({
                  ...(currentRows.find((row) => row.level === entry.level) ??
                    currentRows[index] ?? {
                      proficiencyBonus: 2 + Math.floor(index / 4),
                      cantripsKnown: 0,
                      preparedSpells: 0,
                      spellSlots: Array(9).fill(0),
                    }),
                  level: entry.level,
                }));
                onPatch({ levels, classProgression });
              }}
            />
          </Section>
          <Section eyebrow="05 · Class table" title={t("editor.classTable")}>
            <ClassProgressionEditor
              rows={entity.classProgression ?? []}
              levels={entity.levels ?? []}
              onChange={(classProgression) => onPatch({ classProgression })}
            />
          </Section>
          <Section eyebrow="06 · Choices" title={t("editor.additionalChoices")}>
            {choicesEditor}
          </Section>
          <Section eyebrow="07 · Equipment" title={t("editor.equipmentSets")}>
            <EquipmentOptionsEditor
              entity={entity}
              entities={entities}
              locale={locale}
              onPatch={onPatch}
            />
          </Section>
        </>
      )}

      {entity.entityType === "subclass" && (
        <Section eyebrow="03 · Subclass" title={t("editor.subclass")}>
          <div className="form-grid">
            <Field label={t("editor.baseClassId")} wide>
              <EntityPicker
                entities={entities}
                type="class"
                value={entity.classId ?? ""}
                onChange={(classId) => onPatch({ classId })}
              />
            </Field>
          </div>
          <LevelsEditor
            editableLevels
            title={t("editor.subclassLevels")}
            levels={entity.subclassLevels ?? []}
            entities={entities}
            locale={locale}
            onChange={(subclassLevels) => onPatch({ subclassLevels })}
          />
        </Section>
      )}

      {entity.entityType === "species" && (
        <>
          <Section eyebrow="03 · Species" title={t("editor.species")}>
            <div className="species-parameter-groups">
              <section className="species-parameter-group species-body-group">
                <h3>{locale === "en" ? "Body" : "Физические параметры"}</h3>
                <div className="species-body-grid">
                  <Field label={t("editor.lifespan")}>
                    <NumberControl
                      value={entity.lifespanYears ?? 80}
                      min={0}
                      max={1000}
                      unit={locale === "en" ? "years" : "лет"}
                      onChange={(lifespanYears) => onPatch({ lifespanYears })}
                    />
                  </Field>
                  <Field label={t("editor.sizeOptions")}>
                    <SizeOptionsPicker
                      value={entity.sizeOptions ?? []}
                      locale={locale}
                      onChange={(sizeOptions) => onPatch({ sizeOptions })}
                    />
                  </Field>
                </div>
              </section>
              <section className="species-parameter-group">
                <h3>{locale === "en" ? "Movement" : "Скорости"}</h3>
                <div className="species-stat-grid">
                  <Field label={t("editor.walkSpeed")}>
                    <NumberControl
                      value={entity.baseSpeeds?.walk ?? 0}
                      min={0}
                      max={120}
                      unit="ft"
                      onChange={(walk) =>
                        onPatch({ baseSpeeds: { ...entity.baseSpeeds, walk } })
                      }
                    />
                  </Field>
                  <Field label={t("editor.flySpeed")}>
                    <NumberControl
                      value={entity.baseSpeeds?.fly ?? 0}
                      min={0}
                      max={120}
                      unit="ft"
                      onChange={(fly) =>
                        onPatch({ baseSpeeds: { ...entity.baseSpeeds, fly } })
                      }
                    />
                  </Field>
                  <Field label={t("editor.swimSpeed")}>
                    <NumberControl
                      value={entity.baseSpeeds?.swim ?? 0}
                      min={0}
                      max={120}
                      unit="ft"
                      onChange={(swim) =>
                        onPatch({ baseSpeeds: { ...entity.baseSpeeds, swim } })
                      }
                    />
                  </Field>
                </div>
              </section>
              <section className="species-parameter-group">
                <h3>{locale === "en" ? "Senses" : "Чувства"}</h3>
                <div className="species-stat-grid">
                  <Field
                    label={
                      locale === "en" ? "Vision range" : "Дальность зрения"
                    }
                  >
                    <NumberControl
                      value={entity.senses?.vision ?? 0}
                      min={0}
                      max={1000}
                      unit="ft"
                      onChange={(vision) =>
                        onPatch({
                          senses: {
                            vision,
                            darkvision: entity.senses?.darkvision ?? 0,
                            blindsight: entity.senses?.blindsight ?? 0,
                          },
                        })
                      }
                    />
                  </Field>
                  <Field
                    label={
                      locale === "en"
                        ? "Darkvision range"
                        : "Дальность темнозрения"
                    }
                  >
                    <NumberControl
                      value={entity.senses?.darkvision ?? 0}
                      min={0}
                      max={1000}
                      unit="ft"
                      onChange={(darkvision) =>
                        onPatch({
                          senses: {
                            vision: entity.senses?.vision ?? 0,
                            darkvision,
                            blindsight: entity.senses?.blindsight ?? 0,
                          },
                        })
                      }
                    />
                  </Field>
                  <Field
                    label={
                      locale === "en"
                        ? "Blindsight range"
                        : "Дальность слепого зрения"
                    }
                  >
                    <NumberControl
                      value={entity.senses?.blindsight ?? 0}
                      min={0}
                      max={1000}
                      unit="ft"
                      onChange={(blindsight) =>
                        onPatch({
                          senses: {
                            vision: entity.senses?.vision ?? 0,
                            darkvision: entity.senses?.darkvision ?? 0,
                            blindsight,
                          },
                        })
                      }
                    />
                  </Field>
                </div>
              </section>
              <section className="species-parameter-group species-features-group">
                <h3>{t("editor.features")}</h3>
                <EntityMultiPicker
                  entities={entities}
                  type="feature"
                  value={entity.featureIds ?? []}
                  locale={locale}
                  onChange={(featureIds) => onPatch({ featureIds })}
                />
              </section>
            </div>
          </Section>
          <Section eyebrow="04 · Choices" title={t("editor.speciesChoices")}>
            {choicesEditor}
          </Section>
        </>
      )}

      {entity.entityType === "background" && (
        <>
          <Section eyebrow="03 · Background" title={t("editor.background")}>
            <div className="form-grid">
              <Field label={t("editor.threeAbilities")} wide>
                <AbilityPicker
                  limit={3}
                  value={entity.abilityOptions ?? []}
                  onChange={(abilityOptions) =>
                    onPatch({
                      abilityOptions,
                      abilityScoreIncrease: {
                        allowedAbilities: abilityOptions,
                        distributions: entity.abilityScoreIncrease
                          ?.distributions ?? [
                          [2, 1],
                          [1, 1, 1],
                        ],
                        maximumScore:
                          entity.abilityScoreIncrease?.maximumScore ?? 20,
                      },
                    })
                  }
                />
              </Field>
              <Field label={t("editor.abilityDistributions")}>
                <select
                  value={JSON.stringify(
                    entity.abilityScoreIncrease?.distributions ?? [
                      [2, 1],
                      [1, 1, 1],
                    ],
                  )}
                  onChange={(event) =>
                    onPatch({
                      abilityScoreIncrease: {
                        allowedAbilities: entity.abilityOptions ?? [],
                        distributions: JSON.parse(event.target.value),
                        maximumScore:
                          entity.abilityScoreIncrease?.maximumScore ?? 20,
                      },
                    })
                  }
                >
                  <option value="[[2,1],[1,1,1]]">
                    +2 / +1 or +1 / +1 / +1
                  </option>
                  <option value="[[2,1]]">+2 / +1</option>
                  <option value="[[1,1,1]]">+1 / +1 / +1</option>
                </select>
              </Field>
              <Field label={t("editor.abilityMaximum")}>
                <NumberControl
                  value={entity.abilityScoreIncrease?.maximumScore ?? 20}
                  min={1}
                  max={30}
                  onChange={(maximumScore) =>
                    onPatch({
                      abilityScoreIncrease: {
                        allowedAbilities: entity.abilityOptions ?? [],
                        distributions: entity.abilityScoreIncrease
                          ?.distributions ?? [
                          [2, 1],
                          [1, 1, 1],
                        ],
                        maximumScore,
                      },
                    })
                  }
                />
              </Field>
              <Field label={locale === "en" ? "Feat slots" : "Слоты черт"} wide>
                <GrantSlotsEditor
                  entities={entities}
                  locale={locale}
                  value={entity.featIds ?? []}
                  type="feat"
                  onChange={(featIds) => onPatch({ featIds })}
                />
              </Field>
              <Field
                label={
                  locale === "en"
                    ? "Skill proficiency slots"
                    : "Слоты владения навыками"
                }
                wide
              >
                <GrantSlotsEditor
                  entities={entities}
                  locale={locale}
                  value={entity.skillProficiencySlots ?? []}
                  type="reference"
                  referenceCategory="skill"
                  onChange={(skillProficiencySlots) =>
                    onPatch({ skillProficiencySlots })
                  }
                />
              </Field>
              <Field
                label={
                  locale === "en"
                    ? "Tool proficiency slots"
                    : "Слоты владения инструментами"
                }
                wide
              >
                <GrantSlotsEditor
                  entities={entities}
                  locale={locale}
                  value={entity.toolProficiencySlots ?? []}
                  type="reference"
                  referenceCategory="tool"
                  onChange={(toolProficiencySlots) =>
                    onPatch({ toolProficiencySlots })
                  }
                />
              </Field>
              <Field
                label={locale === "en" ? "Feature slots" : "Слоты умений"}
                wide
              >
                <GrantSlotsEditor
                  entities={entities}
                  locale={locale}
                  value={entity.backgroundFeatureSlots ?? []}
                  type="feature"
                  onChange={(backgroundFeatureSlots) =>
                    onPatch({ backgroundFeatureSlots })
                  }
                />
              </Field>
            </div>
          </Section>
          <Section eyebrow="04 · Equipment" title={t("editor.equipmentSets")}>
            <EquipmentOptionsEditor
              entity={entity}
              entities={entities}
              locale={locale}
              onPatch={onPatch}
            />
          </Section>
          <Section eyebrow="05 · Choices" title={t("editor.additionalChoices")}>
            {choicesEditor}
          </Section>
        </>
      )}

      {entity.entityType === "feat" && (
        <>
          <Section eyebrow="03 · Feat" title={t("editor.feat")}>
            <div className="form-grid">
              <Field label={t("editor.category")}>
                <select
                  value={entity.featCategory}
                  onChange={(event) =>
                    onPatch({
                      featCategory: event.target
                        .value as ForgeEntity["featCategory"],
                    })
                  }
                >
                  {[
                    "origin",
                    "general",
                    "fighting_style",
                    "epic_boon",
                    "custom",
                  ].map((value) => (
                    <option key={value} value={value}>
                      {optionLabel(value, locale)}
                    </option>
                  ))}
                </select>
              </Field>
              <Toggle
                label={t("editor.repeatable")}
                checked={Boolean(entity.repeatable)}
                onChange={(repeatable) => onPatch({ repeatable })}
              />
              <Field label={t("editor.repeatConstraint")} wide>
                <input
                  value={entity.repeatConstraint ?? ""}
                  onChange={(event) =>
                    onPatch({ repeatConstraint: event.target.value })
                  }
                />
              </Field>
              <Field label={t("editor.relatedFeatures")} wide>
                <CsvInput
                  value={entity.featureIds ?? []}
                  onChange={(featureIds) => onPatch({ featureIds })}
                />
              </Field>
              <Field label={t("editor.prerequisites")} wide>
                <VisualExpressionList
                  values={entity.prerequisites ?? []}
                  expressions={entity.prerequisiteExpressions}
                  entities={entities}
                  locale={locale}
                  onChange={(prerequisites, prerequisiteExpressions) =>
                    onPatch({ prerequisites, prerequisiteExpressions })
                  }
                />
              </Field>
            </div>
          </Section>
          <Section eyebrow="04 · Choices" title={t("editor.featChoices")}>
            {choicesEditor}
          </Section>
        </>
      )}

      {entity.entityType === "feature" && (
        <>
          <Section eyebrow="03 · Feature" title={t("editor.featureMode")}>
            <div className="form-grid three">
              <Field label={t("editor.featureType")}>
                <select
                  value={entity.mode}
                  onChange={(event) =>
                    onPatch({ mode: event.target.value as ForgeEntity["mode"] })
                  }
                >
                  {["always_on", "manual_unlimited", "limited_use"].map(
                    (value) => (
                      <option key={value} value={value}>
                        {optionLabel(value, locale)}
                      </option>
                    ),
                  )}
                </select>
              </Field>
              <Field label={t("editor.activation")}>
                <select
                  value={entity.activation}
                  onChange={(event) =>
                    onPatch({
                      activation: event.target
                        .value as ForgeEntity["activation"],
                    })
                  }
                >
                  {[
                    "none",
                    "action",
                    "bonus_action",
                    "reaction",
                    "free_action",
                    "special",
                  ].map((value) => (
                    <option key={value} value={value}>
                      {optionLabel(value, locale)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("common.automation")}>
                <select
                  value={entity.automationLevel}
                  onChange={(event) =>
                    onPatch({
                      automationLevel: event.target
                        .value as ForgeEntity["automationLevel"],
                    })
                  }
                >
                  {["full", "partial", "manual"].map((value) => (
                    <option key={value} value={value}>
                      {optionLabel(value, locale)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("editor.prerequisites")} wide>
                <VisualExpressionList
                  values={entity.prerequisites ?? []}
                  expressions={entity.prerequisiteExpressions}
                  entities={entities}
                  locale={locale}
                  onChange={(prerequisites, prerequisiteExpressions) =>
                    onPatch({ prerequisites, prerequisiteExpressions })
                  }
                />
              </Field>
            </div>
            {entity.mode === "limited_use" && (
              <div className="resource-panel">
                <h3>{t("editor.resourceRecovery")}</h3>
                <div className="form-grid three">
                  <Field label={t("editor.resourceId")}>
                    <input
                      className="readonly-id"
                      value={
                        entity.resource?.id ??
                        makeSubentityId(entity.id, "Resource", "resource")
                      }
                      readOnly
                    />
                  </Field>
                  <Field label={t("common.maximum")}>
                    <VisualExpressionBuilder
                      value={entity.resource?.maximumFormula ?? "1"}
                      expression={entity.resource?.maximumExpression}
                      entities={entities}
                      locale={locale}
                      onChange={(maximumFormula, maximumExpression) =>
                        onPatch({
                          resource: {
                            ...entity.resource!,
                            id:
                              entity.resource?.id ??
                              makeSubentityId(
                                entity.id,
                                "Resource",
                                "resource",
                              ),
                            maximumFormula,
                            maximumExpression,
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label={t("editor.recovery")}>
                    <select
                      value={entity.resource?.recovery ?? "long_rest"}
                      onChange={(event) =>
                        onPatch({
                          resource: {
                            ...entity.resource!,
                            id:
                              entity.resource?.id ??
                              makeSubentityId(
                                entity.id,
                                "Resource",
                                "resource",
                              ),
                            recovery: event.target.value as NonNullable<
                              ForgeEntity["resource"]
                            >["recovery"],
                          },
                        })
                      }
                    >
                      {recoveryOptions.map((value) => (
                        <option key={value} value={value}>
                          {optionLabel(value, locale)}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t("editor.recoveryFormula")} wide>
                    <VisualExpressionBuilder
                      value={entity.resource?.recoveryFormula ?? "1"}
                      expression={entity.resource?.recoveryExpression}
                      entities={entities}
                      locale={locale}
                      onChange={(recoveryFormula, recoveryExpression) =>
                        onPatch({
                          resource: {
                            ...entity.resource!,
                            id:
                              entity.resource?.id ??
                              makeSubentityId(
                                entity.id,
                                "Resource",
                                "resource",
                              ),
                            recoveryFormula,
                            recoveryExpression,
                          },
                        })
                      }
                    />
                  </Field>
                </div>
              </div>
            )}
          </Section>
          <Section eyebrow="04 · Effects" title={t("editor.atomicEffects")}>
            <EffectsEditor
              entity={entity}
              entities={entities}
              onChange={(effects) => onPatch({ effects })}
            />
          </Section>
          <Section eyebrow="05 · Choices" title={t("editor.featureChoices")}>
            {choicesEditor}
          </Section>
        </>
      )}

      {entity.entityType === "feature" && (
        <Section
          eyebrow="06 · Granted spells"
          title={t("editor.grantedSpells")}
        >
          <GrantedSpellsEditor
            entity={entity}
            entities={entities}
            locale={locale}
            onPatch={onPatch}
          />
        </Section>
      )}
      {entity.entityType === "item" && (
        <VisualItemEditor
          entity={entity}
          entities={entities}
          onPatch={onPatch}
        />
      )}
      {entity.entityType === "spell" && (
        <VisualSpellEditor
          entity={entity}
          entities={entities}
          onPatch={onPatch}
        />
      )}
      {entity.entityType === "reference" && (
        <Section eyebrow="03 · Reference" title={t("editor.reference")}>
          <div className="form-grid">
            <Field label={t("editor.category")}>
              <select
                value={entity.referenceCategory}
                onChange={(event) =>
                  onPatch({
                    referenceCategory: event.target
                      .value as ForgeEntity["referenceCategory"],
                  })
                }
              >
                {[
                  "ability",
                  "skill",
                  "language",
                  "tool",
                  "damage_type",
                  "condition",
                  "sense",
                  "movement_type",
                  "size",
                  "rest_type",
                  "action_type",
                  "weapon_property",
                  "weapon_mastery",
                  "armor_training",
                  "spell_school",
                ].map((value) => (
                  <option key={value} value={value}>
                    {optionLabel(value, locale)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={locale === "en" ? "Properties" : "Свойства"} wide>
              <ReferenceValueEditor
                value={entity.referenceValue ?? {}}
                locale={locale}
                onChange={(referenceValue) => onPatch({ referenceValue })}
              />
            </Field>
          </div>
        </Section>
      )}
    </div>
  );
}

function SizeOptionsPicker({
  value,
  locale,
  onChange,
}: {
  value: string[];
  locale: Locale;
  onChange: (value: string[]) => void;
}) {
  const sizes = [
    { id: "tiny", label: "Tiny (¼ square)" },
    { id: "small", label: "Small (1 square)" },
    { id: "medium", label: "Medium (1 square)" },
    { id: "large", label: "Large (4 squares)" },
    { id: "huge", label: "Huge (9 squares)" },
    { id: "gargantuan", label: "Gargantuan (16 squares)" },
  ];
  return (
    <div className="size-picker">
      {sizes.map((size) => (
        <button
          type="button"
          className={value.includes(size.id) ? "selected" : ""}
          key={size.id}
          onClick={() =>
            onChange(
              value.includes(size.id)
                ? value.filter((item) => item !== size.id)
                : [...value, size.id],
            )
          }
        >
          <strong>{size.label.split(" (")[0]}</strong>
          <small>
            {size.label.match(/\((.+)\)/)?.[1]}
            {locale === "ru" ? " клетки" : ""}
          </small>
        </button>
      ))}
    </div>
  );
}

function GrantSlotsEditor({
  entities,
  value,
  locale,
  onChange,
  type,
  referenceCategory,
}: {
  entities: ForgeEntity[];
  value: string[];
  locale: Locale;
  onChange: (value: string[]) => void;
  type: ForgeEntity["entityType"];
  referenceCategory?: ForgeEntity["referenceCategory"];
}) {
  return (
    <div className="grant-slots">
      {value.map((id, index) => (
        <div
          className={`grant-slot${id ? " filled" : " open-choice"}`}
          key={`${id}-${index}`}
        >
          <span className="card-index">{index + 1}</span>
          <EntityPicker
            entities={entities}
            type={type}
            referenceCategory={referenceCategory}
            value={id}
            onChange={(next) =>
              onChange(
                value.map((item, itemIndex) =>
                  itemIndex === index ? next : item,
                ),
              )
            }
          />
          {!id && (
            <small>
              {locale === "en" ? "Player chooses later" : "Игрок выберет позже"}
            </small>
          )}
          <button
            className="icon-button danger"
            type="button"
            onClick={() =>
              onChange(value.filter((_, itemIndex) => itemIndex !== index))
            }
          >
            ×
          </button>
        </div>
      ))}
      <button
        className="add-card-button"
        type="button"
        onClick={() => onChange([...value, ""])}
      >
        ＋ {locale === "en" ? "Add slot" : "Добавить слот"}
      </button>
    </div>
  );
}

function GrantedSpellsEditor({
  entity,
  entities,
  locale,
  onPatch,
}: {
  entity: ForgeEntity;
  entities: ForgeEntity[];
  locale: Locale;
  onPatch: (patch: Partial<ForgeEntity>) => void;
}) {
  const grants = entity.spellGrants ?? [];
  const patchGrant = (index: number, patch: Partial<(typeof grants)[number]>) =>
    onPatch({
      spellGrants: grants.map((grant, grantIndex) =>
        grantIndex === index ? { ...grant, ...patch } : grant,
      ),
    });
  return (
    <div className="cards-list">
      {grants.map((grant, index) => (
        <article
          className="subcard visual-card"
          key={`${grant.spellId}-${index}`}
        >
          <header>
            <div>
              <span className="card-index">{index + 1}</span>
              <strong>
                {locale === "en" ? "Granted spell" : "Дарованное заклинание"}
              </strong>
            </div>
            <button
              className="icon-button danger"
              type="button"
              onClick={() =>
                onPatch({
                  spellGrants: grants.filter(
                    (_, grantIndex) => grantIndex !== index,
                  ),
                })
              }
            >
              ×
            </button>
          </header>
          <div className="form-grid three">
            <Field label={locale === "en" ? "Spell" : "Заклинание"} wide>
              <EntityPicker
                entities={entities}
                type="spell"
                value={grant.spellId}
                onChange={(spellId) => patchGrant(index, { spellId })}
              />
            </Field>
            <Field
              label={locale === "en" ? "Character level" : "Уровень персонажа"}
            >
              <NumberControl
                value={grant.atCharacterLevel}
                min={1}
                max={20}
                onChange={(atCharacterLevel) =>
                  patchGrant(index, { atCharacterLevel })
                }
              />
            </Field>
            <Field label={locale === "en" ? "Recovery" : "Восстановление"}>
              <select
                value={grant.recovery}
                onChange={(event) =>
                  patchGrant(index, {
                    recovery: event.target.value as typeof grant.recovery,
                  })
                }
              >
                {[
                  "short_rest",
                  "long_rest",
                  "both",
                  "dawn",
                  "manual",
                  "never",
                ].map((value) => (
                  <option key={value} value={value}>
                    {optionLabel(value, locale)}
                  </option>
                ))}
              </select>
            </Field>
            <Toggle
              label={
                locale === "en" ? "Always prepared" : "Всегда подготовлено"
              }
              checked={grant.alwaysPrepared}
              onChange={(alwaysPrepared) =>
                patchGrant(index, { alwaysPrepared })
              }
            />
            <Toggle
              label={
                locale === "en"
                  ? "Can use spell slots"
                  : "Можно использовать ячейки"
              }
              checked={grant.allowSpellSlots}
              onChange={(allowSpellSlots) =>
                patchGrant(index, { allowSpellSlots })
              }
            />
            <Field
              label={locale === "en" ? "Free uses" : "Бесплатные применения"}
            >
              <VisualExpressionBuilder
                value={grant.freeUsesFormula}
                entities={entities}
                locale={locale}
                onChange={(freeUsesFormula) =>
                  patchGrant(index, { freeUsesFormula })
                }
              />
            </Field>
            <Field
              label={
                locale === "en"
                  ? "Spellcasting abilities"
                  : "Характеристики заклинателя"
              }
              wide
            >
              <AbilityPicker
                value={grant.spellcastingAbilityOptions}
                onChange={(spellcastingAbilityOptions) =>
                  patchGrant(index, { spellcastingAbilityOptions })
                }
              />
            </Field>
          </div>
        </article>
      ))}
      <button
        className="add-card-button"
        type="button"
        onClick={() =>
          onPatch({
            spellGrants: [
              ...grants,
              {
                spellId: "",
                atCharacterLevel: 1,
                alwaysPrepared: true,
                freeUsesFormula: "0",
                recovery: "long_rest",
                allowSpellSlots: true,
                spellcastingAbilityOptions: ["int"],
              },
            ],
          })
        }
      >
        ＋ {locale === "en" ? "Add granted spell" : "Добавить заклинание"}
      </button>
    </div>
  );
}

function ReferenceValueEditor({
  value,
  locale,
  onChange,
}: {
  value: Record<string, unknown>;
  locale: Locale;
  onChange: (value: Record<string, unknown>) => void;
}) {
  const [newKey, setNewKey] = useState("");
  const patch = (key: string, next: unknown) =>
    onChange({ ...value, [key]: next });
  return (
    <div className="property-editor">
      {Object.entries(value).map(([key, current]) => (
        <div className="property-row" key={key}>
          <strong>{key}</strong>
          {Array.isArray(current) ? (
            <CsvInput
              value={current.map(String)}
              onChange={(next) => patch(key, next)}
            />
          ) : typeof current === "boolean" ? (
            <Toggle
              label={
                current
                  ? locale === "en"
                    ? "Enabled"
                    : "Включено"
                  : locale === "en"
                    ? "Disabled"
                    : "Выключено"
              }
              checked={current}
              onChange={(next) => patch(key, next)}
            />
          ) : typeof current === "number" ? (
            <NumberControl
              value={current}
              min={0}
              max={10000}
              onChange={(next) => patch(key, next)}
            />
          ) : (
            <input
              value={String(current ?? "")}
              onChange={(event) => patch(key, event.target.value)}
            />
          )}
          <button
            className="icon-button danger"
            type="button"
            onClick={() =>
              onChange(
                Object.fromEntries(
                  Object.entries(value).filter(
                    ([entryKey]) => entryKey !== key,
                  ),
                ),
              )
            }
          >
            ×
          </button>
        </div>
      ))}
      <div className="property-add">
        <input
          value={newKey}
          onChange={(event) => setNewKey(event.target.value)}
          placeholder={
            locale === "en" ? "New property name" : "Название нового свойства"
          }
        />
        <button
          className="secondary-button"
          type="button"
          disabled={!newKey.trim()}
          onClick={() => {
            if (newKey.trim() && !(newKey.trim() in value))
              onChange({ ...value, [newKey.trim()]: "" });
            setNewKey("");
          }}
        >
          ＋
        </button>
      </div>
    </div>
  );
}

function parseItems(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [itemId, quantity] = entry.split(":");
      return { itemId, quantity: Number(quantity || 1) };
    });
}

function EquipmentOptionsEditor({
  entity,
  entities,
  locale,
  onPatch,
}: {
  entity: ForgeEntity;
  entities: ForgeEntity[];
  locale: Locale;
  onPatch: (patch: Partial<ForgeEntity>) => void;
}) {
  const { t } = useUi();
  const options = entity.equipmentOptions ?? [];
  const patchOption = (
    index: number,
    patch: Partial<(typeof options)[number]>,
  ) =>
    onPatch({
      equipmentOptions: options.map((option, optionIndex) =>
        optionIndex === index ? { ...option, ...patch } : option,
      ),
    });
  return (
    <div className="cards-list">
      {options.map((option, index) => (
        <article className="subcard visual-card" key={`${option.id}-${index}`}>
          <header className="subentity-header">
            <span className="card-index">{index + 1}</span>
            <input
              className="subentity-name"
              aria-label={
                locale === "en" ? "Equipment set name" : "Название комплекта"
              }
              value={
                locale === "en"
                  ? (option.name ?? `Equipment Set ${index + 1}`)
                  : (option.nameRu ?? `Комплект ${index + 1}`)
              }
              onChange={(event) =>
                patchOption(
                  index,
                  locale === "en"
                    ? { name: event.target.value }
                    : { nameRu: event.target.value },
                )
              }
            />
            <button
              className="icon-button danger"
              type="button"
              onClick={() =>
                onPatch({
                  equipmentOptions: options.filter(
                    (_, itemIndex) => itemIndex !== index,
                  ),
                })
              }
            >
              ×
            </button>
          </header>
          <div className="form-grid">
            <Field
              label={t("editor.setId")}
              hint={
                locale === "en"
                  ? "Generated from the English name"
                  : "Создаётся из английского названия"
              }
            >
              <input className="readonly-id" value={option.id} readOnly />
            </Field>
            <Field label={t("editor.currency")}>
              <NumberControl
                value={option.currencyCp}
                min={0}
                max={999999}
                unit="cp"
                onChange={(currencyCp) => patchOption(index, { currencyCp })}
              />
            </Field>
            <Field label={t("editor.items")} wide>
              <EntityQuantityList
                entities={entities}
                value={option.items}
                locale={locale}
                onChange={(items) => patchOption(index, { items })}
              />
            </Field>
            <Field label={t("editor.choiceItems")} wide>
              <div className="entity-quantity-list">
                {(option.choiceItems ?? []).map((entry, entryIndex) => (
                  <div
                    className="entity-quantity-row"
                    key={`${entry.choiceId}-${entryIndex}`}
                  >
                    <select
                      value={entry.choiceId}
                      onChange={(event) =>
                        patchOption(index, {
                          choiceItems: (option.choiceItems ?? []).map(
                            (item, itemIndex) =>
                              itemIndex === entryIndex
                                ? { ...item, choiceId: event.target.value }
                                : item,
                          ),
                        })
                      }
                    >
                      <option value="">—</option>
                      {(entity.choices ?? []).map((choice) => (
                        <option key={choice.id} value={choice.id}>
                          {choice.name || choice.id}
                        </option>
                      ))}
                    </select>
                    <NumberControl
                      value={entry.quantity}
                      min={1}
                      max={99}
                      onChange={(quantity) =>
                        patchOption(index, {
                          choiceItems: (option.choiceItems ?? []).map(
                            (item, itemIndex) =>
                              itemIndex === entryIndex
                                ? { ...item, quantity }
                                : item,
                          ),
                        })
                      }
                    />
                    <button
                      className="icon-button danger"
                      type="button"
                      onClick={() =>
                        patchOption(index, {
                          choiceItems: (option.choiceItems ?? []).filter(
                            (_, itemIndex) => itemIndex !== entryIndex,
                          ),
                        })
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  className="add-card-button"
                  type="button"
                  onClick={() =>
                    patchOption(index, {
                      choiceItems: [
                        ...(option.choiceItems ?? []),
                        {
                          choiceId: entity.choices?.[0]?.id ?? "",
                          quantity: 1,
                        },
                      ],
                    })
                  }
                >
                  ＋{" "}
                  {locale === "en"
                    ? "Add choice item"
                    : "Добавить предмет из выбора"}
                </button>
              </div>
            </Field>
          </div>
        </article>
      ))}
      <button
        className="add-card-button"
        type="button"
        onClick={() => {
          const name = `Equipment Set ${options.length + 1}`;
          onPatch({
            equipmentOptions: [
              ...options,
              {
                id: makeSubentityId(
                  entity.id,
                  name,
                  `equipment_set_${options.length + 1}`,
                ),
                name,
                nameRu: `Комплект ${options.length + 1}`,
                items: [],
                choiceItems: [],
                currencyCp: 0,
              },
            ],
          });
        }}
      >
        ＋ {t("editor.addSet")}
      </button>
    </div>
  );
}

function VisualItemEditor({
  entity,
  entities,
  onPatch,
}: {
  entity: ForgeEntity;
  entities: ForgeEntity[];
  onPatch: (patch: Partial<ForgeEntity>) => void;
}) {
  const { t, locale } = useUi();
  const setType = (itemType: NonNullable<ForgeEntity["itemType"]>) => {
    const patch: Partial<ForgeEntity> = { itemType };
    if (itemType === "weapon" && !entity.weaponProfile)
      patch.weaponProfile = {
        category: "simple_melee",
        damage: "1d6",
        damageTypeId: "damage.slashing",
        scalingAbility: "str",
        rangeNormalFeet: 0,
        rangeLongFeet: 0,
        propertyIds: [],
        masteryId: "",
      };
    if (["armor", "shield"].includes(itemType) && !entity.armorProfile)
      patch.armorProfile = {
        category: itemType === "shield" ? "shield" : "light",
        baseAc: itemType === "shield" ? 2 : 11,
        addsDexterity: itemType !== "shield",
        maxDexterityBonus: 99,
        strengthRequirement: 0,
        stealthDisadvantage: false,
      };
    onPatch(patch);
  };
  const damageMatch = entity.weaponProfile?.damage.match(
    /^(\d+)(d\d+)(?:\s*([+-])\s*(\d+))?$/i,
  );
  const damageCount = Number(damageMatch?.[1] ?? 1);
  const damageDie = damageMatch?.[2] ?? "d6";
  const damageBonus = Number(
    `${damageMatch?.[3] === "-" ? "-" : ""}${damageMatch?.[4] ?? 0}`,
  );
  const patchDamage = (count: number, die: string, bonus: number) =>
    onPatch({
      weaponProfile: {
        ...entity.weaponProfile!,
        damage: `${count}${die}${bonus ? ` ${bonus > 0 ? "+" : "-"} ${Math.abs(bonus)}` : ""}`,
      },
    });
  return (
    <>
      <Section eyebrow="03 · Item" title={t("editor.itemPhysical")}>
        <div className="form-grid three">
          <Field label={t("editor.itemType")}>
            <select
              value={entity.itemType}
              onChange={(event) =>
                setType(
                  event.target.value as NonNullable<ForgeEntity["itemType"]>,
                )
              }
            >
              {[
                "gear",
                "weapon",
                "armor",
                "shield",
                "tool",
                "consumable",
                "container",
                "wondrous",
                "currency",
                "spell_material",
                "custom",
              ].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
          <Field label={t("editor.weight")}>
            <NumberControl
              value={entity.weightLb ?? 0}
              min={0}
              max={500}
              step={0.1}
              unit="lb"
              onChange={(weightLb) => onPatch({ weightLb })}
            />
          </Field>
          <Field label={t("editor.cost")}>
            <NumberControl
              value={entity.costCp ?? 0}
              min={0}
              max={999999}
              unit="cp"
              onChange={(costCp) => onPatch({ costCp })}
            />
          </Field>
          <Toggle
            label={t("editor.stackable")}
            checked={Boolean(entity.stackable)}
            onChange={(stackable) => onPatch({ stackable })}
          />
          <Toggle
            label={t("editor.consumable")}
            checked={Boolean(entity.consumable)}
            onChange={(consumable) => onPatch({ consumable })}
          />
          <Toggle
            label={t("editor.attunement")}
            checked={Boolean(entity.requiresAttunement)}
            onChange={(requiresAttunement) => onPatch({ requiresAttunement })}
          />
          <Field label={t("editor.equipmentSlots")} wide>
            <CsvInput
              value={entity.equipmentSlots ?? []}
              onChange={(equipmentSlots) => onPatch({ equipmentSlots })}
            />
          </Field>
          <Field label={t("editor.requirements")} wide>
            <VisualExpressionList
              values={entity.requirements ?? []}
              expressions={entity.requirementExpressions}
              entities={entities}
              locale={locale}
              onChange={(requirements, requirementExpressions) =>
                onPatch({ requirements, requirementExpressions })
              }
            />
          </Field>
          <Field
            label={
              locale === "en"
                ? "Spellcasting focus for"
                : "Фокусировка для классов"
            }
            wide
          >
            <EntityMultiPicker
              entities={entities}
              type="class"
              value={entity.spellcastingFocusFor ?? []}
              locale={locale}
              onChange={(spellcastingFocusFor) =>
                onPatch({ spellcastingFocusFor })
              }
            />
          </Field>
          <Field
            label={locale === "en" ? "Contained items" : "Предметы внутри"}
            wide
          >
            <EntityQuantityList
              entities={entities}
              value={entity.containedItems ?? []}
              locale={locale}
              onChange={(containedItems) => onPatch({ containedItems })}
            />
          </Field>
        </div>
      </Section>
      {entity.itemType === "weapon" && entity.weaponProfile && (
        <Section eyebrow="04 · Weapon" title={t("editor.weaponProfile")}>
          <div className="form-grid three">
            <Field label={t("editor.category")}>
              <select
                value={entity.weaponProfile.category}
                onChange={(event) =>
                  onPatch({
                    weaponProfile: {
                      ...entity.weaponProfile!,
                      category: event.target.value as NonNullable<
                        ForgeEntity["weaponProfile"]
                      >["category"],
                    },
                  })
                }
              >
                {[
                  "simple_melee",
                  "simple_ranged",
                  "martial_melee",
                  "martial_ranged",
                  "custom",
                ].map((value) => (
                  <option key={value} value={value}>{optionLabel(value, locale)}</option>
                ))}
              </select>
            </Field>
            <Field label={t("editor.damage")} wide>
              <div className="dice-builder">
                <NumberControl
                  value={damageCount}
                  min={1}
                  max={20}
                  onChange={(count) =>
                    patchDamage(count, damageDie, damageBonus)
                  }
                />
                <select
                  value={damageDie}
                  onChange={(event) =>
                    patchDamage(damageCount, event.target.value, damageBonus)
                  }
                >
                  {["d4", "d6", "d8", "d10", "d12", "d20", "d100"].map(
                    (die) => (
                      <option key={die}>{die}</option>
                    ),
                  )}
                </select>
                <NumberControl
                  value={damageBonus}
                  min={-20}
                  max={20}
                  onChange={(bonus) =>
                    patchDamage(damageCount, damageDie, bonus)
                  }
                />
              </div>
            </Field>
            <Field label={t("editor.damageType")}>
              <select
                value={entity.weaponProfile.damageTypeId}
                onChange={(event) =>
                  onPatch({
                    weaponProfile: {
                      ...entity.weaponProfile!,
                      damageTypeId: event.target.value,
                    },
                  })
                }
              >
                {[
                  "acid",
                  "bludgeoning",
                  "cold",
                  "fire",
                  "force",
                  "lightning",
                  "necrotic",
                  "piercing",
                  "poison",
                  "psychic",
                  "radiant",
                  "slashing",
                  "thunder",
                ].map((value) => (
                  <option key={value} value={`damage.${value}`}>
                    {optionLabel(value, locale)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("editor.ability")}>
              <select
                value={entity.weaponProfile.scalingAbility}
                onChange={(event) =>
                  onPatch({
                    weaponProfile: {
                      ...entity.weaponProfile!,
                      scalingAbility: event.target.value as NonNullable<
                        ForgeEntity["weaponProfile"]
                      >["scalingAbility"],
                    },
                  })
                }
              >
                {["str", "dex", "finesse", "custom"].map((value) => (
                  <option key={value} value={value}>{optionLabel(value, locale)}</option>
                ))}
              </select>
            </Field>
            <Field label={t("editor.normalRange")}>
              <NumberControl
                value={entity.weaponProfile.rangeNormalFeet}
                min={0}
                max={1000}
                unit="ft"
                onChange={(rangeNormalFeet) =>
                  onPatch({
                    weaponProfile: {
                      ...entity.weaponProfile!,
                      rangeNormalFeet,
                    },
                  })
                }
              />
            </Field>
            <Field label={t("editor.longRange")}>
              <NumberControl
                value={entity.weaponProfile.rangeLongFeet}
                min={0}
                max={2000}
                unit="ft"
                onChange={(rangeLongFeet) =>
                  onPatch({
                    weaponProfile: { ...entity.weaponProfile!, rangeLongFeet },
                  })
                }
              />
            </Field>
            <Field label={t("editor.properties")} wide>
              <CsvInput
                value={entity.weaponProfile.propertyIds}
                onChange={(propertyIds) =>
                  onPatch({
                    weaponProfile: { ...entity.weaponProfile!, propertyIds },
                  })
                }
              />
            </Field>
            <Field label={t("editor.mastery")}>
              <select
                value={entity.weaponProfile.masteryId}
                onChange={(event) =>
                  onPatch({
                    weaponProfile: {
                      ...entity.weaponProfile!,
                      masteryId: event.target.value,
                    },
                  })
                }
              >
                <option value="">—</option>
                {[
                  "cleave",
                  "graze",
                  "nick",
                  "push",
                  "sap",
                  "slow",
                  "topple",
                  "vex",
                ].map((value) => (
                  <option key={value} value={`mastery.${value}`}>
                    {optionLabel(value, locale)}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Section>
      )}
      {["armor", "shield"].includes(entity.itemType ?? "") &&
        entity.armorProfile && (
          <Section eyebrow="04 · Armor" title={t("editor.armorProfile")}>
            <div className="form-grid three">
              <Field label={t("editor.category")}>
                <select
                  value={entity.armorProfile.category}
                  onChange={(event) =>
                    onPatch({
                      armorProfile: {
                        ...entity.armorProfile!,
                        category: event.target.value as NonNullable<
                          ForgeEntity["armorProfile"]
                        >["category"],
                      },
                    })
                  }
                >
                  {["light", "medium", "heavy", "shield", "custom"].map(
                    (value) => (
                      <option key={value} value={value}>{optionLabel(value, locale)}</option>
                    ),
                  )}
                </select>
              </Field>
              <Field label={t("editor.baseAc")}>
                <NumberControl
                  value={entity.armorProfile.baseAc}
                  min={0}
                  max={30}
                  onChange={(baseAc) =>
                    onPatch({
                      armorProfile: { ...entity.armorProfile!, baseAc },
                    })
                  }
                />
              </Field>
              <Field label={t("editor.maxDex")}>
                <NumberControl
                  value={entity.armorProfile.maxDexterityBonus}
                  min={0}
                  max={10}
                  onChange={(maxDexterityBonus) =>
                    onPatch({
                      armorProfile: {
                        ...entity.armorProfile!,
                        maxDexterityBonus,
                      },
                    })
                  }
                />
              </Field>
              <Field label={t("editor.strRequirement")}>
                <NumberControl
                  value={entity.armorProfile.strengthRequirement}
                  min={0}
                  max={30}
                  onChange={(strengthRequirement) =>
                    onPatch({
                      armorProfile: {
                        ...entity.armorProfile!,
                        strengthRequirement,
                      },
                    })
                  }
                />
              </Field>
              <Toggle
                label={t("editor.addDex")}
                checked={entity.armorProfile.addsDexterity}
                onChange={(addsDexterity) =>
                  onPatch({
                    armorProfile: { ...entity.armorProfile!, addsDexterity },
                  })
                }
              />
              <Toggle
                label={t("editor.stealthDisadvantage")}
                checked={entity.armorProfile.stealthDisadvantage}
                onChange={(stealthDisadvantage) =>
                  onPatch({
                    armorProfile: {
                      ...entity.armorProfile!,
                      stealthDisadvantage,
                    },
                  })
                }
              />
            </div>
          </Section>
        )}
      <Section eyebrow="05 · Charges" title={t("editor.charges")}>
        <div className="form-grid">
          <Toggle
            label={t("editor.usesCharges")}
            checked={Boolean(entity.charges)}
            onChange={(enabled) =>
              onPatch({
                charges: enabled
                  ? { maximumFormula: "1", recovery: "dawn" }
                  : undefined,
              })
            }
          />
          {entity.charges && (
            <>
              <Field label={t("editor.maxCharges")}>
                <VisualExpressionBuilder
                  value={entity.charges.maximumFormula}
                  expression={entity.charges.maximumExpression}
                  entities={entities}
                  locale={locale}
                  onChange={(maximumFormula, maximumExpression) =>
                    onPatch({
                      charges: {
                        ...entity.charges!,
                        maximumFormula,
                        maximumExpression,
                      },
                    })
                  }
                />
              </Field>
              <Field label={t("editor.recovery")}>
                <select
                  value={entity.charges.recovery}
                  onChange={(event) =>
                    onPatch({
                      charges: {
                        ...entity.charges!,
                        recovery: event.target.value as NonNullable<
                          ForgeEntity["charges"]
                        >["recovery"],
                      },
                    })
                  }
                >
                  {recoveryOptions.map((value) => (
                    <option key={value} value={value}>{optionLabel(value, locale)}</option>
                  ))}
                </select>
              </Field>
            </>
          )}
        </div>
      </Section>
      <Section eyebrow="06 · Effects" title={t("editor.itemEffects")}>
        <EffectsEditor
          entity={entity}
          entities={entities}
          onChange={(effects) => onPatch({ effects })}
        />
      </Section>
    </>
  );
}

function ItemEditor({
  entity,
  entities,
  onPatch,
}: {
  entity: ForgeEntity;
  entities: ForgeEntity[];
  onPatch: (patch: Partial<ForgeEntity>) => void;
}) {
  const { t, locale } = useUi();
  const setType = (itemType: NonNullable<ForgeEntity["itemType"]>) => {
    const patch: Partial<ForgeEntity> = { itemType };
    if (itemType === "weapon" && !entity.weaponProfile)
      patch.weaponProfile = {
        category: "simple_melee",
        damage: "1d6",
        damageTypeId: "damage.slashing",
        scalingAbility: "str",
        rangeNormalFeet: 0,
        rangeLongFeet: 0,
        propertyIds: [],
        masteryId: "",
      };
    if (["armor", "shield"].includes(itemType) && !entity.armorProfile)
      patch.armorProfile = {
        category: itemType === "shield" ? "shield" : "light",
        baseAc: itemType === "shield" ? 2 : 11,
        addsDexterity: itemType !== "shield",
        maxDexterityBonus: 99,
        strengthRequirement: 0,
        stealthDisadvantage: false,
      };
    onPatch(patch);
  };
  return (
    <>
      <Section eyebrow="03 · Item" title={t("editor.itemPhysical")}>
        <div className="form-grid three">
          <Field label={t("editor.itemType")}>
            <select
              value={entity.itemType}
              onChange={(event) =>
                setType(
                  event.target.value as NonNullable<ForgeEntity["itemType"]>,
                )
              }
            >
              {[
                "gear",
                "weapon",
                "armor",
                "shield",
                "tool",
                "consumable",
                "container",
                "wondrous",
                "currency",
                "spell_material",
                "custom",
              ].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
          <Field label={t("editor.weight")}>
            <input
              type="number"
              min="0"
              step="0.01"
              value={entity.weightLb ?? 0}
              onChange={(event) =>
                onPatch({ weightLb: Number(event.target.value) })
              }
            />
          </Field>
          <Field label={t("editor.cost")}>
            <input
              type="number"
              min="0"
              value={entity.costCp ?? 0}
              onChange={(event) =>
                onPatch({ costCp: Number(event.target.value) })
              }
            />
          </Field>
          <Toggle
            label={t("editor.stackable")}
            checked={Boolean(entity.stackable)}
            onChange={(stackable) => onPatch({ stackable })}
          />
          <Toggle
            label={t("editor.consumable")}
            checked={Boolean(entity.consumable)}
            onChange={(consumable) => onPatch({ consumable })}
          />
          <Toggle
            label={t("editor.attunement")}
            checked={Boolean(entity.requiresAttunement)}
            onChange={(requiresAttunement) => onPatch({ requiresAttunement })}
          />
          <Field label={t("editor.equipmentSlots")} wide>
            <CsvInput
              value={entity.equipmentSlots ?? []}
              onChange={(equipmentSlots) => onPatch({ equipmentSlots })}
            />
          </Field>
          <Field label={t("editor.requirements")} wide>
            <VisualExpressionList
              values={entity.requirements ?? []}
              expressions={entity.requirementExpressions}
              entities={entities}
              locale={locale}
              onChange={(requirements, requirementExpressions) =>
                onPatch({ requirements, requirementExpressions })
              }
            />
          </Field>
          <Field label="Spellcasting focus for" wide>
            <CsvInput
              value={entity.spellcastingFocusFor ?? []}
              onChange={(spellcastingFocusFor) =>
                onPatch({ spellcastingFocusFor })
              }
            />
          </Field>
          <Field label="Contained items" wide hint={t("editor.itemsHint")}>
            <input
              value={(entity.containedItems ?? [])
                .map((item) => `${item.itemId}:${item.quantity}`)
                .join(", ")}
              onChange={(event) =>
                onPatch({ containedItems: parseItems(event.target.value) })
              }
            />
          </Field>
        </div>
      </Section>
      {entity.itemType === "weapon" && entity.weaponProfile && (
        <Section eyebrow="04 · Weapon" title={t("editor.weaponProfile")}>
          <div className="form-grid three">
            <Field label={t("editor.category")}>
              <select
                value={entity.weaponProfile.category}
                onChange={(event) =>
                  onPatch({
                    weaponProfile: {
                      ...entity.weaponProfile!,
                      category: event.target.value as NonNullable<
                        ForgeEntity["weaponProfile"]
                      >["category"],
                    },
                  })
                }
              >
                {[
                  "simple_melee",
                  "simple_ranged",
                  "martial_melee",
                  "martial_ranged",
                  "custom",
                ].map((value) => (
                  <option key={value} value={value}>{optionLabel(value, locale)}</option>
                ))}
              </select>
            </Field>
            <Field label={t("editor.damage")}>
              <input
                value={entity.weaponProfile.damage}
                onChange={(event) =>
                  onPatch({
                    weaponProfile: {
                      ...entity.weaponProfile!,
                      damage: event.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label={t("editor.damageType")}>
              <input
                value={entity.weaponProfile.damageTypeId}
                onChange={(event) =>
                  onPatch({
                    weaponProfile: {
                      ...entity.weaponProfile!,
                      damageTypeId: event.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label={t("editor.ability")}>
              <select
                value={entity.weaponProfile.scalingAbility}
                onChange={(event) =>
                  onPatch({
                    weaponProfile: {
                      ...entity.weaponProfile!,
                      scalingAbility: event.target.value as NonNullable<
                        ForgeEntity["weaponProfile"]
                      >["scalingAbility"],
                    },
                  })
                }
              >
                {["str", "dex", "finesse", "custom"].map((value) => (
                  <option key={value} value={value}>{optionLabel(value, locale)}</option>
                ))}
              </select>
            </Field>
            <Field label={t("editor.normalRange")}>
              <input
                type="number"
                min="0"
                value={entity.weaponProfile.rangeNormalFeet}
                onChange={(event) =>
                  onPatch({
                    weaponProfile: {
                      ...entity.weaponProfile!,
                      rangeNormalFeet: Number(event.target.value),
                    },
                  })
                }
              />
            </Field>
            <Field label={t("editor.longRange")}>
              <input
                type="number"
                min="0"
                value={entity.weaponProfile.rangeLongFeet}
                onChange={(event) =>
                  onPatch({
                    weaponProfile: {
                      ...entity.weaponProfile!,
                      rangeLongFeet: Number(event.target.value),
                    },
                  })
                }
              />
            </Field>
            <Field label={t("editor.properties")} wide>
              <CsvInput
                value={entity.weaponProfile.propertyIds}
                onChange={(propertyIds) =>
                  onPatch({
                    weaponProfile: { ...entity.weaponProfile!, propertyIds },
                  })
                }
              />
            </Field>
            <Field label={t("editor.mastery")}>
              <input
                value={entity.weaponProfile.masteryId}
                onChange={(event) =>
                  onPatch({
                    weaponProfile: {
                      ...entity.weaponProfile!,
                      masteryId: event.target.value,
                    },
                  })
                }
              />
            </Field>
          </div>
        </Section>
      )}
      {["armor", "shield"].includes(entity.itemType ?? "") &&
        entity.armorProfile && (
          <Section eyebrow="04 · Armor" title={t("editor.armorProfile")}>
            <div className="form-grid three">
              <Field label={t("editor.category")}>
                <select
                  value={entity.armorProfile.category}
                  onChange={(event) =>
                    onPatch({
                      armorProfile: {
                        ...entity.armorProfile!,
                        category: event.target.value as NonNullable<
                          ForgeEntity["armorProfile"]
                        >["category"],
                      },
                    })
                  }
                >
                  {["light", "medium", "heavy", "shield", "custom"].map(
                    (value) => (
                      <option key={value} value={value}>{optionLabel(value, locale)}</option>
                    ),
                  )}
                </select>
              </Field>
              <Field label={t("editor.baseAc")}>
                <input
                  type="number"
                  min="0"
                  value={entity.armorProfile.baseAc}
                  onChange={(event) =>
                    onPatch({
                      armorProfile: {
                        ...entity.armorProfile!,
                        baseAc: Number(event.target.value),
                      },
                    })
                  }
                />
              </Field>
              <Field label={t("editor.maxDex")}>
                <input
                  type="number"
                  min="0"
                  value={entity.armorProfile.maxDexterityBonus}
                  onChange={(event) =>
                    onPatch({
                      armorProfile: {
                        ...entity.armorProfile!,
                        maxDexterityBonus: Number(event.target.value),
                      },
                    })
                  }
                />
              </Field>
              <Field label={t("editor.strRequirement")}>
                <input
                  type="number"
                  min="0"
                  value={entity.armorProfile.strengthRequirement}
                  onChange={(event) =>
                    onPatch({
                      armorProfile: {
                        ...entity.armorProfile!,
                        strengthRequirement: Number(event.target.value),
                      },
                    })
                  }
                />
              </Field>
              <Toggle
                label={t("editor.addDex")}
                checked={entity.armorProfile.addsDexterity}
                onChange={(addsDexterity) =>
                  onPatch({
                    armorProfile: { ...entity.armorProfile!, addsDexterity },
                  })
                }
              />
              <Toggle
                label={t("editor.stealthDisadvantage")}
                checked={entity.armorProfile.stealthDisadvantage}
                onChange={(stealthDisadvantage) =>
                  onPatch({
                    armorProfile: {
                      ...entity.armorProfile!,
                      stealthDisadvantage,
                    },
                  })
                }
              />
            </div>
          </Section>
        )}
      <Section eyebrow="05 · Charges" title={t("editor.charges")}>
        <div className="form-grid">
          <Toggle
            label={t("editor.usesCharges")}
            checked={Boolean(entity.charges)}
            onChange={(enabled) =>
              onPatch({
                charges: enabled
                  ? { maximumFormula: "1", recovery: "dawn" }
                  : undefined,
              })
            }
          />
          {entity.charges && (
            <>
              <Field label={t("editor.maxCharges")}>
                <VisualExpressionBuilder
                  value={entity.charges.maximumFormula}
                  expression={entity.charges.maximumExpression}
                  entities={entities}
                  locale={locale}
                  onChange={(maximumFormula, maximumExpression) =>
                    onPatch({
                      charges: {
                        ...entity.charges!,
                        maximumFormula,
                        maximumExpression,
                      },
                    })
                  }
                />
              </Field>
              <Field label={t("editor.recovery")}>
                <select
                  value={entity.charges.recovery}
                  onChange={(event) =>
                    onPatch({
                      charges: {
                        ...entity.charges!,
                        recovery: event.target.value as NonNullable<
                          ForgeEntity["charges"]
                        >["recovery"],
                      },
                    })
                  }
                >
                  {recoveryOptions.map((value) => (
                    <option key={value} value={value}>{optionLabel(value, locale)}</option>
                  ))}
                </select>
              </Field>
            </>
          )}
        </div>
      </Section>
      <Section eyebrow="06 · Effects" title={t("editor.itemEffects")}>
        <EffectsEditor
          entity={entity}
          entities={entities}
          onChange={(effects) => onPatch({ effects })}
        />
      </Section>
    </>
  );
}

function MaterialGroupsEditor({
  entity,
  entities,
  onPatch,
}: {
  entity: ForgeEntity;
  entities: ForgeEntity[];
  onPatch: (patch: Partial<ForgeEntity>) => void;
}) {
  const { locale } = useUi();
  const groups = entity.materialGroups ?? [];
  const itemEntities = entities.filter((item) => item.entityType === "item");
  const patchGroup = (index: number, patch: Partial<(typeof groups)[number]>) =>
    onPatch({
      materialGroups: groups.map((group, groupIndex) =>
        groupIndex === index ? { ...group, ...patch } : group,
      ),
    });
  return (
    <div className="cards-list material-groups">
      {groups.map((group, groupIndex) => (
        <article className="subcard" key={`${group.id}-${groupIndex}`}>
          <header className="subentity-header">
            <span className="card-index">{groupIndex + 1}</span>
            <input
              className="subentity-name"
              aria-label={
                locale === "en"
                  ? "Material group name"
                  : "Название группы материалов"
              }
              value={
                locale === "en"
                  ? (group.name ?? `Material Group ${groupIndex + 1}`)
                  : (group.nameRu ?? `Группа материалов ${groupIndex + 1}`)
              }
              onChange={(event) =>
                patchGroup(
                  groupIndex,
                  locale === "en"
                    ? { name: event.target.value }
                    : { nameRu: event.target.value },
                )
              }
            />
            <button
              className="icon-button danger"
              type="button"
              onClick={() =>
                onPatch({
                  materialGroups: groups.filter(
                    (_, index) => index !== groupIndex,
                  ),
                })
              }
            >
              ×
            </button>
          </header>
          <div className="form-grid three">
            <Field
              label={
                locale === "en" ? "Source wording" : "Формулировка из источника"
              }
              wide
            >
              <input
                value={group.sourceText}
                onChange={(event) =>
                  patchGroup(groupIndex, { sourceText: event.target.value })
                }
              />
            </Field>
            <Field
              label={
                locale === "en"
                  ? "Minimum group cost, cp"
                  : "Минимальная стоимость группы, мм"
              }
            >
              <input
                type="number"
                min="0"
                max="999999"
                value={group.minimumTotalCostCp}
                onChange={(event) =>
                  patchGroup(groupIndex, {
                    minimumTotalCostCp: Number(event.target.value),
                  })
                }
              />
            </Field>
            <Field
              label={locale === "en" ? "Source currency" : "Валюта источника"}
            >
              <select
                value={group.sourceCurrency}
                onChange={(event) =>
                  patchGroup(groupIndex, { sourceCurrency: event.target.value })
                }
              >
                {["None", "CP", "SP", "EP", "GP", "PP"].map((currency) => (
                  <option key={currency}>{currency}</option>
                ))}
              </select>
            </Field>
            <Toggle
              label={
                locale === "en"
                  ? "Consumed by the spell"
                  : "Расходуется заклинанием"
              }
              checked={group.consumed}
              onChange={(consumed) => patchGroup(groupIndex, { consumed })}
            />
          </div>
          <div className="material-entry-list">
            {group.entries.map((entry, entryIndex) => (
              <div
                className="material-entry"
                key={`${entry.itemId}-${entryIndex}`}
              >
                <Field
                  label={
                    locale === "en" ? "Inventory item" : "Предмет инвентаря"
                  }
                >
                  <EntityPicker
                    entities={itemEntities}
                    type="item"
                    value={entry.itemId}
                    onChange={(itemId) =>
                      patchGroup(groupIndex, {
                        entries: group.entries.map((item, index) =>
                          index === entryIndex ? { ...item, itemId } : item,
                        ),
                      })
                    }
                  />
                </Field>
                <Field label={locale === "en" ? "Quantity" : "Количество"}>
                  <input
                    type="number"
                    min="1"
                    value={entry.quantity}
                    onChange={(event) =>
                      patchGroup(groupIndex, {
                        entries: group.entries.map((item, index) =>
                          index === entryIndex
                            ? { ...item, quantity: Number(event.target.value) }
                            : item,
                        ),
                      })
                    }
                  />
                </Field>
                <Field
                  label={
                    locale === "en" ? "Minimum cost, cp" : "Мин. стоимость, мм"
                  }
                >
                  <input
                    type="number"
                    min="0"
                    max="999999"
                    value={entry.minimumCostCp}
                    onChange={(event) =>
                      patchGroup(groupIndex, {
                        entries: group.entries.map((item, index) =>
                          index === entryIndex
                            ? {
                                ...item,
                                minimumCostCp: Number(event.target.value),
                              }
                            : item,
                        ),
                      })
                    }
                  />
                </Field>
                <Toggle
                  label={locale === "en" ? "Consumed" : "Расходуется"}
                  checked={entry.consumed}
                  onChange={(consumed) =>
                    patchGroup(groupIndex, {
                      entries: group.entries.map((item, index) =>
                        index === entryIndex ? { ...item, consumed } : item,
                      ),
                    })
                  }
                />
                <button
                  className="icon-button danger"
                  type="button"
                  onClick={() =>
                    patchGroup(groupIndex, {
                      entries: group.entries.filter(
                        (_, index) => index !== entryIndex,
                      ),
                    })
                  }
                >
                  ×
                </button>
              </div>
            ))}
            <button
              className="text-action"
              type="button"
              onClick={() =>
                patchGroup(groupIndex, {
                  entries: [
                    ...group.entries,
                    {
                      itemId: "",
                      quantity: 1,
                      minimumCostCp: 0,
                      consumed: false,
                    },
                  ],
                })
              }
            >
              {locale === "en"
                ? "+ Add inventory item"
                : "+ Добавить предмет инвентаря"}
            </button>
          </div>
        </article>
      ))}
      <button
        className="secondary-button"
        type="button"
        onClick={() =>
          onPatch({
            materialGroups: [
              ...groups,
              {
                id: makeSubentityId(
                  entity.id,
                  `Material Group ${groups.length + 1}`,
                  `material_group_${groups.length + 1}`,
                ),
                name: `Material Group ${groups.length + 1}`,
                nameRu: `Группа материалов ${groups.length + 1}`,
                sourceText: "",
                minimumTotalCostCp: 0,
                sourceCurrency: "None",
                consumed: false,
                entries: [],
              },
            ],
          })
        }
      >
        {locale === "en"
          ? "+ Add material group"
          : "+ Добавить группу материалов"}
      </button>
    </div>
  );
}

function SpellProfilesEditor({
  entity,
  onPatch,
}: {
  entity: ForgeEntity;
  onPatch: (patch: Partial<ForgeEntity>) => void;
}) {
  const { locale } = useUi();
  const profiles = entity.spellProfiles ?? [];
  const dice = ["", "d4", "d6", "d8", "d10", "d12", "d20", "d100"];
  const patchProfile = (
    index: number,
    patch: Partial<(typeof profiles)[number]>,
  ) =>
    onPatch({
      spellProfiles: profiles.map((profile, profileIndex) =>
        profileIndex === index ? { ...profile, ...patch } : profile,
      ),
    });
  return (
    <div className="cards-list spell-profiles">
      {profiles.map((profile, index) => (
        <article
          className="subcard"
          key={`${profile.sourceSheet}-${profile.sourceRow}-${index}`}
        >
          <header>
            <strong>
              {locale === "en"
                ? `Mechanical profile ${index + 1}`
                : `Механический профиль ${index + 1}`}
            </strong>
            <button
              className="icon-button danger"
              type="button"
              onClick={() =>
                onPatch({
                  spellProfiles: profiles.filter(
                    (_, profileIndex) => profileIndex !== index,
                  ),
                })
              }
            >
              ×
            </button>
          </header>
          <div className="form-grid three">
            <Field label={locale === "en" ? "Effect type" : "Тип эффекта"}>
              <select
                value={profile.category}
                onChange={(event) =>
                  patchProfile(index, { category: event.target.value })
                }
              >
                {["damage", "healing", "neutral"].map((category) => (
                  <option key={category} value={category}>{optionLabel(category, locale)}</option>
                ))}
              </select>
            </Field>
            <Field label={locale === "en" ? "Initial dice" : "Начальные кости"}>
              <div className="dice-pair">
                <input
                  type="number"
                  min="0"
                  value={profile.dice.initialCount}
                  onChange={(event) =>
                    patchProfile(index, {
                      dice: {
                        ...profile.dice,
                        initialCount: Number(event.target.value),
                      },
                    })
                  }
                />
                <select
                  value={profile.dice.initialDie}
                  onChange={(event) =>
                    patchProfile(index, {
                      dice: { ...profile.dice, initialDie: event.target.value },
                    })
                  }
                >
                  {dice.map((die) => (
                    <option key={die} value={die}>
                      {die || "—"}
                    </option>
                  ))}
                </select>
              </div>
            </Field>
            <Field
              label={locale === "en" ? "Periodic dice" : "Периодические кости"}
            >
              <div className="dice-pair">
                <input
                  type="number"
                  min="0"
                  value={profile.dice.periodicCount}
                  onChange={(event) =>
                    patchProfile(index, {
                      dice: {
                        ...profile.dice,
                        periodicCount: Number(event.target.value),
                      },
                    })
                  }
                />
                <select
                  value={profile.dice.periodicDie}
                  onChange={(event) =>
                    patchProfile(index, {
                      dice: {
                        ...profile.dice,
                        periodicDie: event.target.value,
                      },
                    })
                  }
                >
                  {dice.map((die) => (
                    <option key={die} value={die}>
                      {die || "—"}
                    </option>
                  ))}
                </select>
              </div>
            </Field>
            <Field
              label={locale === "en" ? "Periodic rounds" : "Количество раундов"}
            >
              <input
                type="number"
                min="0"
                value={profile.dice.periodRounds}
                onChange={(event) =>
                  patchProfile(index, {
                    dice: {
                      ...profile.dice,
                      periodRounds: Number(event.target.value),
                    },
                  })
                }
              />
            </Field>
            <Toggle
              label={
                locale === "en"
                  ? "Scales at higher level"
                  : "Масштабируется на высоком уровне"
              }
              checked={profile.higherLevel.enabled}
              onChange={(enabled) =>
                patchProfile(index, { higherLevel: { enabled } })
              }
            />
          </div>
        </article>
      ))}
      <button
        className="secondary-button"
        type="button"
        onClick={() =>
          onPatch({
            spellProfiles: [
              ...profiles,
              {
                sourceSheet: "Forge",
                sourceRow: 0,
                category: "neutral",
                dice: {
                  initialCount: 0,
                  initialDie: "",
                  periodicCount: 0,
                  periodicDie: "",
                  periodRounds: 0,
                },
                higherLevel: { enabled: false },
              },
            ],
          })
        }
      >
        {locale === "en"
          ? "+ Add mechanical profile"
          : "+ Добавить механический профиль"}
      </button>
    </div>
  );
}

function VisualSpellEditor({
  entity,
  entities,
  onPatch,
}: {
  entity: ForgeEntity;
  entities: ForgeEntity[];
  onPatch: (patch: Partial<ForgeEntity>) => void;
}) {
  const { t, locale } = useUi();
  const rangeNeedsDistance = entity.range?.type === "distance";
  const durationNeedsValue = ![
    "instant",
    "until_dispelled",
    "special",
  ].includes(entity.duration?.type ?? "instant");
  return (
    <>
      <Section eyebrow="03 · Spell" title={t("editor.spellCore")}>
        <div className="form-grid three">
          <Field label={t("editor.level")} tone="accent">
            <NumberControl
              value={entity.spellLevel ?? 0}
              min={0}
              max={9}
              onChange={(spellLevel) => onPatch({ spellLevel })}
            />
          </Field>
          <Field label={locale === "en" ? "School" : "Школа"}>
            <select
              value={entity.schoolId ?? ""}
              onChange={(event) => onPatch({ schoolId: event.target.value })}
            >
              {[
                "abjuration",
                "conjuration",
                "divination",
                "enchantment",
                "evocation",
                "illusion",
                "necromancy",
                "transmutation",
              ].map((school) => (
                <option key={school} value={`spell_school.${school}`}>
                  {optionLabel(school, locale)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("editor.castingTime")}>
            <select
              value={entity.casting?.actionType}
              onChange={(event) =>
                onPatch({
                  casting: {
                    ...entity.casting!,
                    actionType: event.target.value as NonNullable<
                      ForgeEntity["casting"]
                    >["actionType"],
                  },
                })
              }
            >
              {[
                "action",
                "bonus_action",
                "reaction",
                "minute",
                "hour",
                "special",
              ].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
          <Field label={t("editor.amount")}>
            <NumberControl
              value={entity.casting?.value ?? 1}
              min={1}
              max={24}
              onChange={(value) =>
                onPatch({ casting: { ...entity.casting!, value } })
              }
            />
          </Field>
          {entity.casting?.actionType === "reaction" && (
            <Field label={t("editor.reactionTrigger")} wide>
              <input
                value={entity.casting?.reactionTrigger ?? ""}
                onChange={(event) =>
                  onPatch({
                    casting: {
                      ...entity.casting!,
                      reactionTrigger: event.target.value,
                    },
                  })
                }
              />
            </Field>
          )}
          <Field label={locale === "en" ? "Classes" : "Классы"} wide>
            <EntityMultiPicker
              entities={entities}
              type="class"
              value={entity.spellClassIds ?? []}
              locale={locale}
              onChange={(spellClassIds) => onPatch({ spellClassIds })}
            />
          </Field>
        </div>
      </Section>
      <Section eyebrow="04 · Geometry" title={t("editor.geometry")}>
        <div className="geometry-preview">
          <div
            className={`shape-preview shape-${entity.area?.shape ?? "none"}`}
          >
            <span>
              {entity.area?.shape === "none"
                ? "•"
                : entity.area?.shape?.slice(0, 1).toUpperCase()}
            </span>
          </div>
          <div>
            <strong>
              {optionLabel(entity.area?.shape ?? "none", locale)}
            </strong>
            <small>
              {entity.area?.sizeFeet ?? 0} ft ·{" "}
              {optionLabel(entity.range?.type ?? "none", locale)}
            </small>
          </div>
        </div>
        <div className="form-grid three">
          <Field label={t("editor.rangeType")}>
            <select
              value={entity.range?.type}
              onChange={(event) =>
                onPatch({
                  range: {
                    ...entity.range!,
                    type: event.target.value as NonNullable<
                      ForgeEntity["range"]
                    >["type"],
                  },
                })
              }
            >
              {[
                "self",
                "touch",
                "distance",
                "sight",
                "unlimited",
                "special",
              ].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
          {rangeNeedsDistance && (
            <Field label={t("editor.distance")}>
              <NumberControl
                value={entity.range?.distanceFeet ?? 0}
                min={5}
                max={1000}
                step={5}
                unit="ft"
                onChange={(distanceFeet) =>
                  onPatch({ range: { ...entity.range!, distanceFeet } })
                }
              />
            </Field>
          )}
          <Field label={t("editor.areaShape")}>
            <select
              value={entity.area?.shape}
              onChange={(event) =>
                onPatch({
                  area: {
                    ...entity.area!,
                    shape: event.target.value as NonNullable<
                      ForgeEntity["area"]
                    >["shape"],
                  },
                })
              }
            >
              {[
                "none",
                "cone",
                "cube",
                "cylinder",
                "emanation",
                "line",
                "sphere",
                "wall",
              ].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
          {entity.area?.shape !== "none" && (
            <Field label={t("editor.areaSize")}>
              <NumberControl
                value={entity.area?.sizeFeet ?? 0}
                min={0}
                max={500}
                step={5}
                unit="ft"
                onChange={(sizeFeet) =>
                  onPatch({ area: { ...entity.area!, sizeFeet } })
                }
              />
            </Field>
          )}
          <Field label={t("common.duration")}>
            <select
              value={entity.duration?.type}
              onChange={(event) =>
                onPatch({
                  duration: {
                    ...entity.duration!,
                    type: event.target.value as NonNullable<
                      ForgeEntity["duration"]
                    >["type"],
                  },
                })
              }
            >
              {[
                "instant",
                "rounds",
                "minutes",
                "hours",
                "days",
                "until_dispelled",
                "special",
              ].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
          {durationNeedsValue && (
            <Field label={t("common.value")}>
              <NumberControl
                value={entity.duration?.value ?? 1}
                min={1}
                max={1000}
                onChange={(value) =>
                  onPatch({ duration: { ...entity.duration!, value } })
                }
              />
            </Field>
          )}
          <Toggle
            label={t("editor.concentration")}
            checked={Boolean(entity.duration?.concentration)}
            onChange={(concentration) =>
              onPatch({ duration: { ...entity.duration!, concentration } })
            }
          />
        </div>
      </Section>
      <Section eyebrow="05 · Components" title={t("editor.components")}>
        <div className="component-picker">
          <Toggle
            label={t("editor.verbal")}
            checked={Boolean(entity.components?.verbal)}
            onChange={(verbal) =>
              onPatch({ components: { ...entity.components!, verbal } })
            }
          />
          <Toggle
            label={t("editor.somatic")}
            checked={Boolean(entity.components?.somatic)}
            onChange={(somatic) =>
              onPatch({ components: { ...entity.components!, somatic } })
            }
          />
          <Toggle
            label={t("editor.material")}
            checked={Boolean(entity.components?.material)}
            onChange={(material) =>
              onPatch({ components: { ...entity.components!, material } })
            }
          />
          <Toggle
            label={t("editor.ritual")}
            checked={Boolean(entity.ritual)}
            onChange={(ritual) => onPatch({ ritual })}
          />
        </div>
        <div className="form-grid three">
          <Field label={t("editor.attackType")}>
            <select
              value={entity.attackType}
              onChange={(event) =>
                onPatch({
                  attackType: event.target.value as ForgeEntity["attackType"],
                })
              }
            >
              {["none", "melee_spell", "ranged_spell"].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
          <Field label={t("editor.savingThrow")}>
            <select
              value={entity.savingThrowAbility}
              onChange={(event) =>
                onPatch({
                  savingThrowAbility: event.target.value as AbilityId | "",
                })
              }
            >
              <option value="">—</option>
              {abilities.map((ability) => (
                <option key={ability}>{ability.toUpperCase()}</option>
              ))}
            </select>
          </Field>
          <Field label={t("common.automation")}>
            <select
              value={entity.automationLevel}
              onChange={(event) =>
                onPatch({
                  automationLevel: event.target
                    .value as ForgeEntity["automationLevel"],
                })
              }
            >
              {["full", "partial", "manual"].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
        </div>
        {entity.components?.material && (
          <MaterialGroupsEditor
            entity={entity}
            entities={entities}
            onPatch={onPatch}
          />
        )}
      </Section>
      <Section
        eyebrow="06 · Mechanics"
        title={
          locale === "en"
            ? "Damage, healing and periodic effects"
            : "Урон, лечение и периодические эффекты"
        }
      >
        <SpellProfilesEditor entity={entity} onPatch={onPatch} />
      </Section>
      <Section eyebrow="07 · Scaling" title={t("editor.scaling")}>
        <div className="cards-list">
          {(entity.scaling ?? []).map((scale, index) => (
            <article
              className="subcard compact-visual"
              key={`${scale.type}-${index}`}
            >
              <Field label={t("common.type")}>
                <select
                  value={scale.type}
                  onChange={(event) =>
                    onPatch({
                      scaling: entity.scaling?.map((item, itemIndex) =>
                        itemIndex === index
                          ? {
                              ...item,
                              type: event.target.value as typeof scale.type,
                            }
                          : item,
                      ),
                    })
                  }
                >
                  {["character_level", "spell_slot_level", "class_level"].map(
                    (value) => (
                      <option key={value} value={value}>{optionLabel(value, locale)}</option>
                    ),
                  )}
                </select>
              </Field>
              <Field label={t("editor.atLevel")}>
                <NumberControl
                  value={scale.at}
                  min={1}
                  max={20}
                  onChange={(at) =>
                    onPatch({
                      scaling: entity.scaling?.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, at } : item,
                      ),
                    })
                  }
                />
              </Field>
              <Field label={t("common.value")}>
                <input
                  value={scale.value}
                  onChange={(event) =>
                    onPatch({
                      scaling: entity.scaling?.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, value: event.target.value }
                          : item,
                      ),
                    })
                  }
                />
              </Field>
              <button
                className="icon-button danger"
                type="button"
                onClick={() =>
                  onPatch({
                    scaling: entity.scaling?.filter(
                      (_, itemIndex) => itemIndex !== index,
                    ),
                  })
                }
              >
                ×
              </button>
            </article>
          ))}
          <button
            className="add-card-button"
            type="button"
            onClick={() =>
              onPatch({
                scaling: [
                  ...(entity.scaling ?? []),
                  { type: "spell_slot_level", at: 2, value: "1d6" },
                ],
              })
            }
          >
            ＋ {t("editor.addScaling")}
          </button>
        </div>
      </Section>
      <Section eyebrow="08 · Effects" title={t("editor.spellEffects")}>
        <EffectsEditor
          entity={entity}
          entities={entities}
          onChange={(effects) => onPatch({ effects })}
        />
      </Section>
    </>
  );
}

function SpellEditor({
  entity,
  entities,
  onPatch,
}: {
  entity: ForgeEntity;
  entities: ForgeEntity[];
  onPatch: (patch: Partial<ForgeEntity>) => void;
}) {
  const { t, locale } = useUi();
  return (
    <>
      <Section eyebrow="03 · Spell" title={t("editor.spellCore")}>
        <div className="form-grid three">
          <Field label={t("editor.level")}>
            <input
              type="number"
              min="0"
              max="9"
              value={entity.spellLevel ?? 0}
              onChange={(event) =>
                onPatch({ spellLevel: Number(event.target.value) })
              }
            />
          </Field>
          <Field label={locale === "en" ? "School" : "Школа"}>
            <select
              value={entity.schoolId ?? ""}
              onChange={(event) => onPatch({ schoolId: event.target.value })}
            >
              {[
                "abjuration",
                "conjuration",
                "divination",
                "enchantment",
                "evocation",
                "illusion",
                "necromancy",
                "transmutation",
              ].map((school) => (
                <option key={school} value={`spell_school.${school}`}>
                  {optionLabel(school, locale)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("editor.castingTime")}>
            <select
              value={entity.casting?.actionType}
              onChange={(event) =>
                onPatch({
                  casting: {
                    ...entity.casting!,
                    actionType: event.target.value as NonNullable<
                      ForgeEntity["casting"]
                    >["actionType"],
                  },
                })
              }
            >
              {[
                "action",
                "bonus_action",
                "reaction",
                "minute",
                "hour",
                "special",
              ].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
          <Field label={t("editor.amount")}>
            <input
              type="number"
              min="1"
              value={entity.casting?.value ?? 1}
              onChange={(event) =>
                onPatch({
                  casting: {
                    ...entity.casting!,
                    value: Number(event.target.value),
                  },
                })
              }
            />
          </Field>
          <Field label={t("editor.reactionTrigger")} wide>
            <input
              value={entity.casting?.reactionTrigger ?? ""}
              onChange={(event) =>
                onPatch({
                  casting: {
                    ...entity.casting!,
                    reactionTrigger: event.target.value,
                  },
                })
              }
            />
          </Field>
          <Field label={locale === "en" ? "Classes" : "Классы"} wide>
            <EntityMultiPicker
              entities={entities}
              type="class"
              value={entity.spellClassIds ?? []}
              locale={locale}
              onChange={(spellClassIds) => onPatch({ spellClassIds })}
            />
          </Field>
        </div>
      </Section>
      <Section eyebrow="04 · Geometry" title={t("editor.geometry")}>
        <div className="form-grid three">
          <Field label={t("editor.rangeType")}>
            <select
              value={entity.range?.type}
              onChange={(event) =>
                onPatch({
                  range: {
                    ...entity.range!,
                    type: event.target.value as NonNullable<
                      ForgeEntity["range"]
                    >["type"],
                  },
                })
              }
            >
              {[
                "self",
                "touch",
                "distance",
                "sight",
                "unlimited",
                "special",
              ].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
          <Field label={t("editor.distance")}>
            <input
              type="number"
              min="0"
              value={entity.range?.distanceFeet ?? 0}
              onChange={(event) =>
                onPatch({
                  range: {
                    ...entity.range!,
                    distanceFeet: Number(event.target.value),
                  },
                })
              }
            />
          </Field>
          <Field label={t("editor.areaShape")}>
            <select
              value={entity.area?.shape}
              onChange={(event) =>
                onPatch({
                  area: {
                    ...entity.area!,
                    shape: event.target.value as NonNullable<
                      ForgeEntity["area"]
                    >["shape"],
                  },
                })
              }
            >
              {[
                "none",
                "cone",
                "cube",
                "cylinder",
                "emanation",
                "line",
                "sphere",
                "wall",
              ].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
          <Field label={t("editor.areaSize")}>
            <input
              type="number"
              min="0"
              value={entity.area?.sizeFeet ?? 0}
              onChange={(event) =>
                onPatch({
                  area: {
                    ...entity.area!,
                    sizeFeet: Number(event.target.value),
                  },
                })
              }
            />
          </Field>
          <Field label={t("common.duration")}>
            <select
              value={entity.duration?.type}
              onChange={(event) =>
                onPatch({
                  duration: {
                    ...entity.duration!,
                    type: event.target.value as NonNullable<
                      ForgeEntity["duration"]
                    >["type"],
                  },
                })
              }
            >
              {[
                "instant",
                "rounds",
                "minutes",
                "hours",
                "days",
                "until_dispelled",
                "special",
              ].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
          <Field label={t("common.value")}>
            <input
              type="number"
              min="1"
              value={entity.duration?.value ?? 1}
              onChange={(event) =>
                onPatch({
                  duration: {
                    ...entity.duration!,
                    value: Number(event.target.value),
                  },
                })
              }
            />
          </Field>
          <Toggle
            label={t("editor.concentration")}
            checked={Boolean(entity.duration?.concentration)}
            onChange={(concentration) =>
              onPatch({ duration: { ...entity.duration!, concentration } })
            }
          />
        </div>
      </Section>
      <Section eyebrow="05 · Components" title={t("editor.components")}>
        <div className="form-grid three">
          <Toggle
            label={t("editor.verbal")}
            checked={Boolean(entity.components?.verbal)}
            onChange={(verbal) =>
              onPatch({ components: { ...entity.components!, verbal } })
            }
          />
          <Toggle
            label={t("editor.somatic")}
            checked={Boolean(entity.components?.somatic)}
            onChange={(somatic) =>
              onPatch({ components: { ...entity.components!, somatic } })
            }
          />
          <Toggle
            label={t("editor.material")}
            checked={Boolean(entity.components?.material)}
            onChange={(material) =>
              onPatch({ components: { ...entity.components!, material } })
            }
          />
          <Toggle
            label={t("editor.ritual")}
            checked={Boolean(entity.ritual)}
            onChange={(ritual) => onPatch({ ritual })}
          />
          <Field label={t("editor.attackType")}>
            <select
              value={entity.attackType}
              onChange={(event) =>
                onPatch({
                  attackType: event.target.value as ForgeEntity["attackType"],
                })
              }
            >
              {["none", "melee_spell", "ranged_spell"].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
          <Field label={t("editor.savingThrow")}>
            <select
              value={entity.savingThrowAbility}
              onChange={(event) =>
                onPatch({
                  savingThrowAbility: event.target.value as AbilityId | "",
                })
              }
            >
              <option value="">—</option>
              {abilities.map((ability) => (
                <option key={ability}>{ability.toUpperCase()}</option>
              ))}
            </select>
          </Field>
          <Field label={t("common.automation")}>
            <select
              value={entity.automationLevel}
              onChange={(event) =>
                onPatch({
                  automationLevel: event.target
                    .value as ForgeEntity["automationLevel"],
                })
              }
            >
              {["full", "partial", "manual"].map((value) => (
                <option key={value} value={value}>{optionLabel(value, locale)}</option>
              ))}
            </select>
          </Field>
        </div>
        <MaterialGroupsEditor
          entity={entity}
          entities={entities}
          onPatch={onPatch}
        />
      </Section>
      <Section
        eyebrow="06 · Spreadsheet mechanics"
        title={
          locale === "en"
            ? "Damage, healing and periodic effects"
            : "Урон, лечение и периодические эффекты"
        }
      >
        <SpellProfilesEditor entity={entity} onPatch={onPatch} />
      </Section>
      <Section eyebrow="07 · Scaling" title={t("editor.scaling")}>
        <div className="cards-list">
          {(entity.scaling ?? []).map((scale, index) => (
            <article className="subcard compact" key={`${scale.type}-${index}`}>
              <Field label={t("common.type")}>
                <select
                  value={scale.type}
                  onChange={(event) =>
                    onPatch({
                      scaling: entity.scaling?.map((item, itemIndex) =>
                        itemIndex === index
                          ? {
                              ...item,
                              type: event.target.value as typeof scale.type,
                            }
                          : item,
                      ),
                    })
                  }
                >
                  {["character_level", "spell_slot_level", "class_level"].map(
                    (value) => (
                      <option key={value} value={value}>{optionLabel(value, locale)}</option>
                    ),
                  )}
                </select>
              </Field>
              <Field label={t("editor.atLevel")}>
                <input
                  type="number"
                  min="1"
                  value={scale.at}
                  onChange={(event) =>
                    onPatch({
                      scaling: entity.scaling?.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, at: Number(event.target.value) }
                          : item,
                      ),
                    })
                  }
                />
              </Field>
              <Field label={t("common.value")}>
                <input
                  value={scale.value}
                  onChange={(event) =>
                    onPatch({
                      scaling: entity.scaling?.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, value: event.target.value }
                          : item,
                      ),
                    })
                  }
                />
              </Field>
              <button
                className="icon-button danger"
                type="button"
                onClick={() =>
                  onPatch({
                    scaling: entity.scaling?.filter(
                      (_, itemIndex) => itemIndex !== index,
                    ),
                  })
                }
              >
                ×
              </button>
            </article>
          ))}
          <button
            className="secondary-button"
            type="button"
            onClick={() =>
              onPatch({
                scaling: [
                  ...(entity.scaling ?? []),
                  { type: "spell_slot_level", at: 2, value: "1d6" },
                ],
              })
            }
          >
            {t("editor.addScaling")}
          </button>
        </div>
      </Section>
      <Section eyebrow="08 · Effects" title={t("editor.spellEffects")}>
        <EffectsEditor
          entity={entity}
          entities={entities}
          onChange={(effects) => onPatch({ effects })}
        />
      </Section>
    </>
  );
}

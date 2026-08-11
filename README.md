# WSGuild Forge / Кузница

Сайт: [forge.wsguild.net](https://forge.wsguild.net)

## Документация

Полная русскоязычная документация находится в [docs/README.md](docs/README.md): руководство пользователя, все сущности и поля, формулы, выборы, эффекты, ID, локализация, форматы `.forge.json`/`.wsgpack`, валидация и словарь обозначений.

Визуальный редактор официального и homebrew-контента D&D 5.5e. Работает как статический сайт, сохраняет проект локально и экспортирует переносимый JSON-пакет `.wsgpack` для Character Creation List и будущего VTT.

## Поддерживаемые сущности

- классы и все 20 уровней прогрессии;
- подклассы и привязка к уровням класса;
- виды, размеры, скорости, умения и выборы;
- предыстории, характеристики, владения и комплекты снаряжения;
- черты и три режима умений;
- предметы, оружие, доспехи, заряды и настройка;
- заклинания, компоненты, область, длительность и масштабирование;
- справочники характеристик, навыков, языков, состояний и других ID.

Механика хранится в атомарных эффектах: цель, операция, значение, формула, условия, режим применения, ресурс, восстановление, сложение и приоритет. Текст `_ru` и `_en` не участвует в математике.

## SRD 5.2.1 Character Origins + Wizard project

Import `projects/srd52-wizard-evoker.forge.json` through the Forge **Import** button. This single editable project contains:

- all 9 SRD 5.2.1 species and their lineages, ancestry choices, resources, senses, resistances, level-gated traits, and granted spells;
- all 4 backgrounds, both equipment choices, their Origin feats, preset feat choices, tools, skills, and dependent Gaming Set selection;
- all 17 SRD feats across Origin, General, Fighting Style, and Epic Boon categories;
- the Wizard, Evoker, all class/subclass features, and the complete level 1–20 spell-slot table;
- 29 items and 27 spells, including every fixed spell granted by the included species.

English is the default locale; Russian remains available from the EN/RU switch. The project validates with zero errors and zero warnings.

The Character Origins update also extends the portable contract with structured `creatureTypeId`, `lifespanYears`, `abilityScoreIncrease`, `featChoiceSelections`, `choiceApplications`, equipment `choiceItems`, `repeatConstraint`, `spellGrants`, and per-turn/Initiative resource recovery modes. These fields keep selections and derived mechanics portable instead of encoding them only in prose.

Regenerate the editable project and canonical pack with:

```bash
node scripts/build-srd-wizard-project.mjs
```

This work includes material from the System Reference Document 5.2.1 (SRD 5.2.1) by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.

## Команды

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
```

После отправки в `main` GitHub Actions публикует `dist/` в GitHub Pages.

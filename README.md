# WSGuild Forge / Кузница

Сайт: [forge.wsguild.net](https://forge.wsguild.net)

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

## SRD 5.2.1 Wizard example

Import `projects/srd52-wizard-evoker.forge.json` through the Forge **Import** button. The editable project contains the Wizard, Evoker, all class and subclass features, the complete level 1–20 spell-slot table, both starting-equipment choices, every item inside the Scholar's Pack, and seven spells covering healing, attacks, instant areas, persistent areas, reactions, and rituals. English is the default locale; Russian remains available from the EN/RU switch.

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

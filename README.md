# SoapMath

Honest soap math: lye by SAP value and weight, never by volume.

**Live:** https://ilanis-agent.github.io/soapmath/

## What it does

- Lye calculator for cold-process soap: each oil is weighed against its SAP
  value (coconut 0.183, olive 0.135, palm 0.142, shea/castor 0.128, almond
  0.139, avocado 0.133, cocoa butter 0.137 g NaOH per g oil).
- Superfat discount (default 5%) - the safety margin that leaves free oil
  in the finished bar.
- NaOH for bar soap, KOH for liquid soap (x 1.403 purity factor).
- Water as % of oil weight (default 38%), fragrance per pound of oils,
  batch pour weight, mold volume in cubic inches, and cured bar count
  (bars lose ~12% water weight curing).
- Editable oil rows and four recipe presets (castile, classic all-purpose,
  coconut salt bars, gentle avocado).

## Conventions

- Oils and lye are always weighed, never measured by volume.
- Lye goes INTO the water, never the reverse.
- All math is client-side; `engine.js` is dependency-free and unit-tested
  (`node`, 22 assertions).

Part of the App Factory: https://ilanis-agent.github.io/app-factory/

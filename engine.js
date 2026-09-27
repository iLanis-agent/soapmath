/* SoapMath engine - honest soap math: lye by SAP value and weight, never by volume. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SoapEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var KOH_FACTOR = 1.403; // KOH is less pure than NaOH: multiply

  // grams of NaOH to saponify 1 g of oil
  var OILS = {
    coconut:  { name: 'Coconut oil',    sap: 0.183 },
    olive:    { name: 'Olive oil',      sap: 0.135 },
    palm:     { name: 'Palm oil',       sap: 0.142 },
    shea:     { name: 'Shea butter',    sap: 0.128 },
    castor:   { name: 'Castor oil',     sap: 0.128 },
    almond:   { name: 'Sweet almond oil', sap: 0.139 },
    avocado:  { name: 'Avocado oil',    sap: 0.133 },
    cocoabut: { name: 'Cocoa butter',   sap: 0.137 }
  };

  /* Lye in ounces for a recipe: oils = [{oil, oz}], superfat as a fraction (0.05 = 5%).
     kind: 'naoh' bar soap, 'koh' liquid soap. */
  function lyeOz(oils, superfat, kind) {
    var g = 0;
    for (var i = 0; i < oils.length; i++) {
      var o = OILS[oils[i].oil];
      if (!o) throw new Error('unknown oil ' + oils[i].oil);
      g += oils[i].oz * 28.35 * o.sap;
    }
    g *= (1 - superfat);
    if (kind === 'koh') g *= KOH_FACTOR;
    return g / 28.35;
  }

  function totalOilOz(oils) {
    var t = 0;
    for (var i = 0; i < oils.length; i++) t += oils[i].oz;
    return t;
  }

  /* Water: soapers work in water as a share of oil weight; 38% is the standard default. */
  function waterOz(oilTotalOz, waterPct) {
    return oilTotalOz * waterPct / 100;
  }

  /* Fragrance/essential oil in oz at a rate per pound of oils. */
  function fragranceOz(oilTotalOz, ozPerLb) {
    return oilTotalOz / 16 * ozPerLb;
  }

  function batchOz(oils, lye, water, fragrance) {
    return totalOilOz(oils) + lye + water + fragrance;
  }

  /* Mold volume needed in cubic inches: soap batter ~1.05x water density. */
  function moldIn3(batchWeightOz) {
    return batchWeightOz / (1.05 * 0.554113);
  }

  /* Bar count from a batch at a target bar weight (cured bars lose ~12% water). */
  function barCount(batchWeightOz, barOz) {
    return Math.floor(batchWeightOz * 0.88 / barOz);
  }

  function r2(x) { return Math.round(x * 100) / 100; }

  return {
    KOH_FACTOR: KOH_FACTOR,
    OILS: OILS,
    lyeOz: lyeOz,
    totalOilOz: totalOilOz,
    waterOz: waterOz,
    fragranceOz: fragranceOz,
    batchOz: batchOz,
    moldIn3: moldIn3,
    barCount: barCount,
    r2: r2
  };
});

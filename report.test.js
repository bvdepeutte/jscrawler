import { test, expect } from "@jest/globals";
import { pageSort } from "./report.js";

test('Sorting Object',() =>{
    const object = {
        'emasphere.com': 18,
        'emasphere.com/fr/solution/consolidation': 12,
        'emasphere.com/fr/solution/fonctionnalites': 5,
        'emasphere.com/fr/communaute/nos-connecteurs/isabel': 6,
        'emasphere.com/fr/solution/reportings-automatises': 5,
        'emasphere.com/fr/collecte-a-visualisation': 7,
        'emasphere.com/fr/solution/partage-de-l-information': 5
      }
    const templateObject = {
        'emasphere.com': 18,
        'emasphere.com/fr/solution/consolidation': 12,
        'emasphere.com/fr/collecte-a-visualisation': 7,
        'emasphere.com/fr/communaute/nos-connecteurs/isabel': 6,
        'emasphere.com/fr/solution/fonctionnalites': 5,
        'emasphere.com/fr/solution/reportings-automatises': 5,
        'emasphere.com/fr/solution/partage-de-l-information': 5
      }
    const sortedObject = pageSort(object)
    console.log(object)
    console.log(sortedObject)
    expect(sortedObject).toStrictEqual(templateObject);
})
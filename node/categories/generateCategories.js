var XLSX = require('xlsx');
var fs = require('fs');

var workbook = XLSX.readFile('./node/categories/Categories.xlsx', {type: 'buffer'});
var sheet_name_list = workbook.SheetNames;
// Третья страница в файле
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[2]]);

var newData = [];
var currentHeadId = 0;
var currentCategoryId = 0;
var currentSubcategory = 0;
xlData.forEach((item, index) => {
    if (item.Heading && !item.headId) {
        newData.push({
            headId: currentHeadId + 1,
            heading: item.Heading,
            categories: []
        });
        currentHeadId++;
        currentCategoryId = 0;
    }
    if (item.Category) {
        newData[currentHeadId - 1].categories.push({
            categoryId: currentCategoryId + 1,
            categoryName: item.Category,
            subcategories: []
        });
        currentCategoryId++;
        currentSubcategory = 0;
    }
    if (item.Subcategory) {
        currentSubcategory++;
        newData[currentHeadId - 1].categories[currentCategoryId - 1].subcategories.push({
            subcategoryId: currentSubcategory,
            subcategoryName: item.Subcategory
        })
    }
});

fs.writeFile('./node/categories/categories.json', JSON.stringify({
    data: newData
}), function (err) {
    if (err) throw err;
    console.log('Results Received');
});
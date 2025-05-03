import {ICategory} from "../../app/DTO/classes/ICategory";
import {IViewCategoryTree} from "../../app/DTO/views/categories/IViewCategoryTree";
import {TypeViewList} from "../../app/DTO/enums/typeViewList";
import {PaymentForType} from "../../app/DTO/enums/paymentForType";


export function prepareTreeList(categories: ICategory[], parentId: number,
                                search: string, isChilds: boolean){
  let result: IViewCategoryTree[] = [];
  const roots = categories.filter(_ => _.parentId === parentId);
  if (roots) {
    for (let root of roots) {
      const childs = prepareTreeList(categories, root.id, search, isChilds);
      if (root.name.toLowerCase().includes(search.toLowerCase()) || childs.length > 0) {
        result.push({
          childrens: isChilds ? childs : [],
          id: root.id,
          isChecked: false,
          name: root.name
        });
      }
    }
  }
  return result.sort((a, b) => a.name.localeCompare(b.name));
}


export function prepareTreeListProfile(categories: ICategory[], parentId: number){
  let result: IViewCategoryTree[] = [];
  const roots = categories.filter(_ => _.parentId === parentId);
  if (roots) {
    for (let root of roots) {
        result.push({
          childrens: prepareTreeListProfile(categories, root.id),
          id: root.id,
          isChecked: false,
          name: root.name
        });

    }
  }
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

export function getServiceForType(categories: ICategory[], type: PaymentForType){
  let roots: ICategory[] = [];
  switch (type) {
    case PaymentForType.ForService:{
      roots = categories.filter(_ => _.fields?.includes('SERVICE'));
      break;
    }
    case PaymentForType.ForHour:{
      roots = categories.filter(_ => _.fields?.includes('HOUR'));
      break;
    }
  }
  let result: ICategory[] = [];
  roots.forEach(item => {
    if (!result.includes(item)) {
      result.push(item);
    }
    if (item.parentId){
      let temp = categories.find(_ => _.id === item.parentId);
      while (temp){
        if (!result.includes(temp)) {
          result.push(temp);
        }
        if (temp.parentId !== null) {
          temp = categories.find(_ => _.id === temp?.parentId);
        } else {
          temp = undefined;
        }
      }
    }
  });
  return result;
}

export function getCategoryForSend(treeCategory: IViewCategoryTree[]): ICategory[]{
  let sendCategories: ICategory[] = [];
  treeCategory.forEach(item => {
      if (item.childrens!.length > 0) {
        item.childrens!.forEach(i => {
          if (i.isChecked){
            sendCategories.push({
              id: i.id,
              name: i.name
            });
          }
        })
      }
      if (item.isChecked){
        sendCategories.push({
          id: item.id,
          name: item.name
        });

    }
  });
  return sendCategories;
}


export function setCategoryState(treeCategory: IViewCategoryTree[]){
  treeCategory.forEach(item => {
    item.isShow = TypeViewList.None;
    if (item.childrens) {
      item.childrens.forEach(sub => {
        sub.isShow = TypeViewList.None;
      });
      if (item.childrens.length > 4) {
        item.isShow = TypeViewList.Close;
        let index = 0;
        item.childrens.forEach(sub => {
          if (index > 4) {
            sub.isShow = TypeViewList.Close;
          }
          index++;
        });
      }
    }
  });
  return treeCategory;
}


export function getCategoryLevel2(categories: ICategory[]){
  let mainCategories = categories.filter(_ => _.parentId === null);
  let result: ICategory[] = [];
  mainCategories.forEach(item => {
    result.push(...categories.filter(_ => _.parentId === item.id));
  });
  return result;
}
import {Pipe, PipeTransform} from '@angular/core';

import {Category} from '../../providers/wp-api/data-clases';

import {AppProvider} from '../../providers/wp-api/app-provider';

import {Observable} from 'rxjs/Observable';

@Pipe({
    name:'available-cat',
    pure:false
})
export class AvailableCategories implements PipeTransform{
    constructor(private _appProvider:AppProvider){}
    transform(data:Observable<Array<Category>>){
        data.subscribe((allCategories)=>{
            
            allCategories.forEach((parent:Category,indexParent:number)=>{
            parent._children.forEach((child:Category, indexChild:number)=>{
                if(this._appProvider._availableCategoryId.indexOf(child._id) != -1){
                    child.setAvailable();
                }else{
                    parent._children.splice(indexChild,1);
                }
            })
                if(this._appProvider._availableCategoryId.indexOf(parent._id) != -1){
                    parent.setAvailable();
                }else{
                    if(parent._children.length < 0){
                        allCategories.splice(indexParent,1);
                    }
                }
            })
        let returnData = allCategories.values;
        return returnData;
        })
        
    }
}
// JavaScript source code
import _ from 'lodash';
import Cages from '../Data';


class StubAPI {

    constructor() {
        this.cages = Cages
          
    }


    getAll() {
        return this.cages;
    }

    delete(k) {
        let elements = _.remove(this.cages,
            (cage) => cage.id === k
        );
        return elements;
    }
   
    add(id, n, i, s) {
        let len = this.cages.length;
        let newLen = this.cages.push({
            id: id, name: n, imageUrl: i, snippet: s
        });
        return newLen > len;
    }

    update(key, id, n, i, s) {
        var index = _.findIndex(this.cages,
            (cage) => cage.id === key
        );
        if (index !== -1) {
            this.cages.splice(index, 1,
                {id: id, name: n, imageUrl: i, snippet: s });
            return true;
        }
        return false;
    }

}

export default (new StubAPI());
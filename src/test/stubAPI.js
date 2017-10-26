// JavaScript source code
import _ from 'lodash';
import Cages from '../Data';
this.cages = Cages


class StubAPI {

    getAll() {
        return this.cages;
    }

    delete(k) {
        let elements = _.remove(this.cages,
            (cage) => cage.id === k
        );
        return elements;
    }
   
    add(n, i, s) {
        let len = this.cages.length;
        let newLen = this.cages.push({
            name: n, imageUrl: i, snippet: s
        });
        return newLen > len;
    }

    update(key, n, i, s) {
        var index = _.findIndex(this.cages,
            (cage) => cage.name === key
        );
        if (index !== -1) {
            this.cages.splice(index, 1,
                { name: n, imageUrl: i, snippet: s });
            return true;
        }
        return false;
    }

}

export default (new StubAPI());
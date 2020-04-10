import A from './a';
import './css/index.less';

A();
// console.log(DEV)
document.getElementById('btn').onclick = function() {
    import('./handle').then(fn => fn.default());
}


console.log($, _map)

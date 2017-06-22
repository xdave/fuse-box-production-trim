import { configureStore, someAction } from './store';

const store = configureStore();

(window as any).eventHandler = () => {
    store.dispatch(someAction());
};

const app = document.createElement('div');
app.setAttribute('id', 'app');
document.querySelector('body').appendChild(app);

const render = () => {
    app.innerHTML = `
        <button onClick="eventHandler();">Click</button>
        <br />
        <span>${store.getState()}</span>
    `;
}

store.subscribe(() => {
    render();
});

store.dispatch(someAction());


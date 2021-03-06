import { html, render } from 'https://unpkg.com/lit-html?module';
import { register } from '../../services/auth.js';
import {Router} from 'https://unpkg.com/@vaadin/router';

const template = (ctx) => html`
        <form class="text-center border border-light p-5" action="#" method="post" @submit=${ctx.onSubmit}>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" placeholder="Email" name="email" value="">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Password" name="password" value="">
            </div>
        
            <div class="form-group">
                <label for="repeatPassword">Repeat Password</label>
                <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
            </div>
        
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
`

export default class Register extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        if (email === '') {
            notify('Please enter an email address!', 'error');
            return;
        }

        if (password.length < 6) {
            notify('Password too short!', 'error');
            return;
        }

        if (password !== repeatPassword) {
            notify('Passwords must match!', 'error');
            return;
        }


        register(email, password)
            .then(res => {
                if (!res.hasOwnProperty('error')) {
                notify('User registered successfully!')
                Router.go('/login');
                } else {
                    throw new Error (res.error.message.split('_').join(' '))
                }
            })
            .catch(err => notify(err, 'error'));
        

    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}

import { Component } from 'react';
import Footer from './footer';
import Header from './header';

export default class AppLayout extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                {this.props.children}
                <Footer></Footer>
            </div>
        );
    }
}
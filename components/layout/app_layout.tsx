import { Component, ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

export default class AppLayout extends Component {
    props: { children: ReactNode };
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
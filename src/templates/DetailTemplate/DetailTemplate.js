import { Fragment, useEffect, useState } from "react";
import { Route } from 'react-router-dom';
import Footer from "../HomeTemplate/Layout/Footer/Footer";
import Header from "../HomeTemplate/Layout/Header/Header";
import { useWindowSize } from 'react-use';




export const DetailTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;

    const { width, height } = useWindowSize();

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    const renderComponent = (propsRoute) => {

        if (width <= 420) {
            if (props.ComponentMobile) {
                return <props.ComponentMobile {...propsRoute} />
            }
        } else if (width <= 1024) {
            if (props.ComponentIpad) {
                return <props.ComponentIpad {...propsRoute} />
            }
        }
        else {
            return <props.Component {...propsRoute} />
        }
    }


    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>
            <Header {...propsRoute} />

            {renderComponent(propsRoute)}

            <Footer {...propsRoute} />

        </Fragment>

    }} />
}
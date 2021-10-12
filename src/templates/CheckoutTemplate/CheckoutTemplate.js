import { Fragment, useEffect, useState } from "react";
import { Route } from 'react-router-dom';
import { USER_LOGIN } from "../../Util/setting";
import { Redirect } from "react-router";
import { useWindowSize } from 'react-use';




const CheckoutTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;

    const { width, height } = useWindowSize();


    useEffect(() => {
        window.scrollTo(0, 0);

    }, [])

    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to="/login" />
    }

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



    return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return <Fragment>

            {renderComponent(propsRoute)}

        </Fragment>

    }} />
}


export default CheckoutTemplate;
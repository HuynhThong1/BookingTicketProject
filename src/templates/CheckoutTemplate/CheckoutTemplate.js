import { Fragment, useEffect, useState } from "react";
import { Route } from 'react-router-dom';
import { USER_LOGIN } from "../../Util/setting";
import { Redirect } from "react-router";




const CheckoutTemplate = (props) => { //path, exact, Component

    const { Component, ...restProps } = props;

    const [state, setState] = useState(3); //1 mobile (ip 6/7 ip 6/7plus), 2 ipad, 3 desktop

    useEffect(() => {
        window.scrollTo(0, 0);

        window.onload = () => {
            let { innerWidth, innerHeight } = window;
            if (innerWidth <= 420) {
                setState(1);
            }
            else if (innerWidth <= 769) {
                setState(2);
            }
            else {
                setState(3);
            }
        }

        window.onresize = () => {
            let { innerWidth, innerHeight } = window;

            if (innerWidth <= 420) {
                setState(1);
            }
            else if (innerWidth <= 769) {
                setState(2);
            }
            else {
                setState(3);
            }
        }



    })

    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to="/login" />
    }

    const renderComponent = (propsRoute) => {
        if (state === 3) {
            return <props.Component {...propsRoute} />
        } else if (state === 1) {
            if (props.ComponentMobile) {
                return <props.ComponentMobile {...propsRoute} />
            }
        }
        else if (state === 2) {
            if (props.ComponentIpad) {
                return <props.ComponentIpad {...propsRoute} />
            }
        }
        // return <props.Component {...propsRoute} />
    }



    return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return <Fragment>

            {renderComponent(propsRoute)}

        </Fragment>

    }} />
}


export default CheckoutTemplate;
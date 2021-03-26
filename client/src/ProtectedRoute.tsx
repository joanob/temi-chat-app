import React from 'react'
import {connect} from "react-redux"
import {Route, Redirect} from "react-router-dom"

const ProtectedRoute = (props: any) => {
    const {user, ...data} = props
    
    if (!user) {
        return <Redirect to="/login" />
    }
    switch (user.lastChat) {
        case 0:
            return <div>Loading</div>
        case 1:
            return <Route {...data} />
    } 
}

export default connect(
    (state) => {
        return {user: state["user"]}
    }
)(ProtectedRoute)
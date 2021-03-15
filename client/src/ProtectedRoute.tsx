import React from 'react'
import {connect} from "react-redux"
import {Route, Redirect} from "react-router-dom"

const ProtectedRoute = (props: any) => {
    const {user, ...data} = props
    
    return user ? 
    <Route {...data} />
    : <Redirect to="/login" />
}

export default connect(
    (state) => {
        return {user: state["user"]}
    }
)(ProtectedRoute)
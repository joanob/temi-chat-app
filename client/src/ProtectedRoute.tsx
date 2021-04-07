import React from 'react'
import {connect} from "react-redux"
import {Route, Redirect} from "react-router-dom"

const ProtectedRoute = (props: any) => {
    const {user, ...data} = props
    
    if (!user) {
        return <Redirect to="/login" />
    } else if (user.id === 0) {
        return <div>Loading</div>
    } else {
        return <Route {...data} />
    } 
}

export default connect(
    (state) => {
        return {user: state["user"]}
    }
)(ProtectedRoute)
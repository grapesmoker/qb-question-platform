import Login from "../components/login/login"
import Showoff from "../components/login/showoff"
import styles from "../components/login/login.module.css"

export default function LoginPage () {
    return(
        <>
        <div className={styles.loginPageDiv}>
            <Showoff />
            <Login />
        </div>
        </>
    )
}
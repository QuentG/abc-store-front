import axios from "axios"

const DEBUG = true

axios.defaults.baseURL = "http://localhost:8080/api"
axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.headers.common.Accept = "application/json"

/* -------------------------
   ----- INTERCEPTORS ------
   ------------------------- */

// Request
axios.interceptors.request.use(
    config => {
        /** In dev, intercepts request and logs it into console for dev */
        if (DEBUG) {
            console.info("➡️ Request ✅", config)
        }

        return config
    },
    error => {
        if (DEBUG) {
            console.error("➡️ Request ️❌", error)
        }

        throw new Error(error)
    }
)

// Response
axios.interceptors.response.use(
    response => {
        if (DEBUG) {
            console.info("⬅️️ Response ✅", response)
        }

        if (response.data.status !== "success") throw response.data.message

        return response
    },
    error => {
        if (DEBUG) {
            console.info("⬅️️ Response ️❌", error)
        }

        throw error.response
    }
)

export default axios

package servicehandlers

import (
    "fmt"
    "log"
    "net/http"
    "time"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        if len(r.request("token")) > 10 {
        } else {
            time.Sleep(time.Second * 5)
        }
    })

    if err := http.ListenAndServe(":3000", nil); err != nil {
        log.Fatal(err)
    }
}
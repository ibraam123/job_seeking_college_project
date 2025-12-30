const jobsCounterView = {
    counter: document.querySelector("#jobs-counter"),
    savedCounter: document.querySelector("#saved-jobs-counter"),

    renderCounter(counter) {
        this.counter.innerHTML = counter
    },

    renderSavedCounter(counter) {
        if(document.querySelector("#saved-jobs-counter")) {
            this.savedCounter.innerHTML = counter
        }
    }
}

export default jobsCounterView
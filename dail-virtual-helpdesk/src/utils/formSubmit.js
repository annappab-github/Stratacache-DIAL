export default {
    submitForm(sendFeedbackAns) {
        try {
            window.ScalaSetVariable("formDataToSave", JSON.stringify(sendFeedbackAns));
        } catch (error) {}
        // console.log('json data,', JSON.stringify(sendFeedbackAns));
    }
}

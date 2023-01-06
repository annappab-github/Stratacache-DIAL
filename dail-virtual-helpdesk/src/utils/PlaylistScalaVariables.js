export default {
    homeSetScalaVariables() {
        try {
            window.ScalaSetVariable("Channel.explorePage", false);
            window.ScalaSetVariable("Channel.exploreRetailPage", false);
            window.ScalaSetVariable("Channel.exploreFandBPage", false);
            window.ScalaSetVariable("Channel.defaultPage", true);
        } catch(err) {

        }
    },
    exploreSetScalaVariables(val) {
        try {
            window.ScalaSetVariable("Channel.defaultPage", false);
            if(val === '/explore')
                window.ScalaSetVariable("Channel.explorePage", true);
        } catch(err) {

        }
    },
    exploreResetScalaVariables() {
        try {
            window.ScalaSetVariable("Channel.explorePage", true);
            window.ScalaSetVariable("Channel.exploreFandBPage", false);
            window.ScalaSetVariable("Channel.exploreRetailPage", false);
        } catch(err) {

        }
    },
    exploreRetailSetScalaVariables() {
        try {
            window.ScalaSetVariable("Channel.explorePage", false);
            window.ScalaSetVariable("Channel.exploreFandBPage", false);
            window.ScalaSetVariable("Channel.exploreRetailPage", true);
        } catch(err) {

        }
    },
    exploreFandBSetScalaVariables() {
        try {
            window.ScalaSetVariable("Channel.explorePage", false);
            window.ScalaSetVariable("Channel.exploreRetailPage", false);
            window.ScalaSetVariable("Channel.exploreFandBPage", true);
        } catch(err) {

        }
    },
    exploreSearchSetScalaVariables() {
        try {
            window.ScalaSetVariable("Channel.explorePage", false);
            window.ScalaSetVariable("Channel.exploreRetailPage", false);
            window.ScalaSetVariable("Channel.exploreFandBPage", false);
        } catch(err) {

        }
    }
}
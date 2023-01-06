import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'
import Boarding from '../views/Boarding.vue'
import TalkToUs from '../views/TalkToUs.vue'
import TalktousFeedback from '../components/TalktousFeedback.vue'
import Feedback from '../views/Feedback.vue'
// import FeedbackForm from '../components/Feedback/FeedbackForm.vue'
import FeedbackScanner from '../components/FeedbackScanner.vue'
import Sos from '../views/Sos.vue'
import ScanQR from '../views/ScanQR.vue'
import ServiceDesk from '../views/ServiceDesk.vue'
import ScanBoardingPass from '../components/ScanBoardingPass.vue'
import Search from '../components/Search.vue'

const routes = [{
        path: '/',
        name: '',
        component: Home
    },
    {
        path: '/boardinginfo/:flightno',
        name: 'boardinginfo',
        component: Boarding
    },
    {
        path: '/scanboardingpass',
        name: 'BOARDING INFORMATION',
        component: ScanBoardingPass
    },
    {
        path: '/scan',
        name: 'QR CODE',
        component: ScanQR
    },
    {
        path: '/talktousfeed',
        name: 'talktousfeed',
        component: TalktousFeedback
    },
    {
        path: '/search',
        name: 'SearchPage',
        component: Search
    },
    {
        path: '/talktous/:id/:reason',
        name: 'talktous',
        component: TalkToUs
    },
    {
        path: '/servicedesk',
        name: 'TALK TO US',
        component: ServiceDesk,
        props: true
    },
    {
        path: '/feedbackscanner',
        name: 'FEEDBACK SCAN',
        component: FeedbackScanner
    },
    {
        path: '/feedback/:flightno/:pnrno',
        name: 'FEEDBACK',
        component: Feedback
    },
    {
        path: '/explore',
        name: 'EXPLORE THE AIRPORT',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Explore,
        props: true
    },
    {
        path: '/sos',
        name: 'EMERGENCY ASSISTANCE',
        component: Sos
    }
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router
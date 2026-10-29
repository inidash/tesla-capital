import DashboardController from './DashboardController'
import PlanController from './PlanController'
import InvestorController from './InvestorController'
import PayoutController from './PayoutController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
PlanController: Object.assign(PlanController, PlanController),
InvestorController: Object.assign(InvestorController, InvestorController),
PayoutController: Object.assign(PayoutController, PayoutController),
}

export default Admin
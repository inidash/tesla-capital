import PageController from './PageController'
import ContactController from './ContactController'
import DashboardController from './DashboardController'
import PlanController from './PlanController'
import InvestmentController from './InvestmentController'
import DepositController from './DepositController'
import Admin from './Admin'
const Controllers = {
    PageController: Object.assign(PageController, PageController),
ContactController: Object.assign(ContactController, ContactController),
DashboardController: Object.assign(DashboardController, DashboardController),
PlanController: Object.assign(PlanController, PlanController),
InvestmentController: Object.assign(InvestmentController, InvestmentController),
DepositController: Object.assign(DepositController, DepositController),
Admin: Object.assign(Admin, Admin),
}

export default Controllers
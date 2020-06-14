const Moment = require('moment-timezone');
const Action = require('/nsfl-trading-cards/api/models/Action')

export const saveAction = (userId, actionName, actionEffect) => {
    const action = new Action({
        user_id: userId,
        action: actionName,
        action_date: Moment.tz('America/Chicago').format(),
    });
    await action.save();

    return;
}
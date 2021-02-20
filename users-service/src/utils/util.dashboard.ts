import { registerPublisher } from '../services/publisher/service.register'
import { loginPublisher } from '../services/publisher/service.login'
import { activationPublisher } from '../services/publisher/service.activation'
import { forgotPublisher } from '../services/publisher/service.forgot'
import { resendPublisher } from '../services/publisher/service.resend'
import { setQueues, BullMQAdapter } from 'bull-board'

export const bullDashboardMonitor = (): void => {
	setQueues([
		new BullMQAdapter(registerPublisher.queue()),
		new BullMQAdapter(loginPublisher.queue()),
		new BullMQAdapter(activationPublisher.queue()),
		new BullMQAdapter(forgotPublisher.queue()),
		new BullMQAdapter(resendPublisher.queue())
	])
}

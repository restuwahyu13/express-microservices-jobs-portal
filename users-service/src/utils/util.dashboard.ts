import { registerPublisher } from '../services/publisher/service.register'
import { activationPublisher } from '../services/publisher/service.activation'
import { resendPublisher } from '../services/publisher/service.resend'
import { setQueues, BullMQAdapter } from 'bull-board'

export const bullDashboardMonitor = (): void => {
	setQueues([
		new BullMQAdapter(registerPublisher.queue()),
		new BullMQAdapter(activationPublisher.queue()),
		new BullMQAdapter(resendPublisher.queue())
	])
}

import { registerPublisher } from '../services/publisher/service.register'
import { setQueues, BullMQAdapter } from 'bull-board'

export const bullDashboardMonitor = (): void => {
	setQueues([new BullMQAdapter(registerPublisher.queue())])
}

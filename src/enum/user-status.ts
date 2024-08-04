export enum StatusUser {
	/**
	 * Pending:
	 * indicates the initial state of the account when it is first created
	 */
	Pending = "pending",
	/**
	 * ActivationSent:
	 * indicates that an activation email has been sent to the user
	 */
	ActivationSent = "activation_sent",
	/**
	 * Enabled:
	 * indicates that the account has been activated
	 */
	Enabled = "enabled",
	/**
	 * Suspended:
	 * the status is self-explanatory
	 */
	Suspended = "suspended",
}

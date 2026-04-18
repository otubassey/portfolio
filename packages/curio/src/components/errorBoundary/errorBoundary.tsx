"use client";

import { Component, ErrorInfo, ReactNode } from "react";

import { Alert } from "../alert";
import { Text } from "../text";

export interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	errorMessage: string;
	hasError: boolean;
	errorDetail?: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			errorMessage: "",
			hasError: false,
			errorDetail: ""
		};
	}

	static getDerivedStateFromError(error: Error): State {
		return {
			errorMessage: error.message || "An unexpected error occurred.",
			hasError: true
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("ErrorBoundary caught an error:", {error, errorInfo});

		if(errorInfo.componentStack) {
			this.setState({
				errorDetail: errorInfo.componentStack
			});
		}
	}

	componentDidUpdate(prevProps: ErrorBoundaryProps) {
		if(this.state.hasError && prevProps.children !== this.props.children) {
			this.setState({
				errorMessage: "",
				hasError: false,
				errorDetail: ""
			});
		}
	}

	render() {
		if(this.state.hasError) {
			if(this.props.fallback) {
				return this.props.fallback
			}
			return (
				<Alert
					copyText={this.state.errorDetail}
					detail={<Text size="small">{this.state.errorDetail}</Text>}
					message={this.state.errorMessage}
					severity="warning"
					variant="outlined"
				/>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;

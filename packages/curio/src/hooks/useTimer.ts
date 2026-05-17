"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import useToggle from "./useToggle";

export type TimerDirection = "drain" | "fill";

export interface UseTimerOptions {
	/**
	 * Determines visual progress calculation.
	 * 'drain': starts at 100 and moves to 0.
	 * 'fill': starts at 0 and moves to 100.
	 */
	direction?: TimerDirection;
	/** Callback executed when the timer naturally expires. */
	onEnd?: () => void;
	/** Frequency in ms to update the progress value. Default: 10ms. */
	progressUpdateInterval?: number;
}

/**
 * The return type of the useTimer hook, providing controls and state
 * for managing a resumable countdown.
 */
export interface UseTimerResult {
	/** Completely stops the timer and resets inProgress state */
	clear: () => void;
	/** Indicates if the timer is currently running (not paused or cleared) */
	inProgress: boolean;
	/** Pauses the timer and stores the remaining time for later resumption */
	pause: () => void;
	/** The current percentage (0-100) based on the chosen direction */
	progress: number;
	/** Stops the timer and restores the initial duration and progress values */
	reset: () => void;
	/** Resumes the timer from the stored remaining time */
	resume: () => void;
	/** Starts the timer with a specific duration or the default remaining time */
	start: (duration: number) => void;
}

/**
 * A specialized hook to manage a resumable countdown timer with progress tracking.
 *
 * Supports pausing, resuming, and clearing. It tracks "remainingTime" across
 * interruptions by calculating the delta between start and pause events.
 *
 * @param options - Configuration for duration, direction, and lifecycle events.
 * @returns {object} Control functions (start, pause, resume, reset, clear) and state (inProgress, progress).
 */
export const useTimer = ({
	direction = "drain",
	onEnd,
	progressUpdateInterval = 10
}: UseTimerOptions): UseTimerResult => {
	const initialProgress = direction === "drain" ? 100 : 0;

	const timerRef = useRef<number | null>(null);
	const progressIntervalRef = useRef<number | null>(null);

	const totalDurationRef = useRef<number>(0);
	const remainingTimeRef = useRef<number>(0);
	const startTimeRef = useRef<number>(0);

	const onEndRef = useRef(onEnd);
	onEndRef.current = onEnd;

	const [inProgress, toggleInProgress] = useToggle(false);
	const [progress, setProgress] = useState(initialProgress);

	const clear = useCallback(() => {
		if(timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		if(progressIntervalRef.current) {
			clearInterval(progressIntervalRef.current);
			progressIntervalRef.current = null;
		}
		toggleInProgress(false);
	}, []);

	const pause = useCallback(() => {
		if(!timerRef.current) return;

		const elapsed = Date.now() - startTimeRef.current;
		remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);

		clear();
	}, [clear]);

	const reset = useCallback(() => {
		clear();
		remainingTimeRef.current = 0;
		setProgress(initialProgress);
	}, [clear, initialProgress]);

	const start = useCallback((duration: number) => {
		const safeDurationvalue = (Number.isInteger(duration) && duration > 0) ? duration : 0;

		if(safeDurationvalue <= 0) {
			return;
		}

		clear();
		totalDurationRef.current = safeDurationvalue;
		remainingTimeRef.current = safeDurationvalue;
		startTimeRef.current = Date.now();
		toggleInProgress(true);

		timerRef.current = setTimeout(() => {
			toggleInProgress(false);
			setProgress(direction === "drain" ? 0 : 100);
			onEndRef.current?.();
		}, safeDurationvalue);

		progressIntervalRef.current = setInterval(() => {
			const currentElapsed = Date.now() - startTimeRef.current;
			const currentRemaining = Math.max(0, safeDurationvalue - currentElapsed);
			const percentageRemaining = (currentRemaining / safeDurationvalue) * 100;

			const nextProgress = direction === "drain"
				? Math.round(percentageRemaining)
				: Math.round(100 - percentageRemaining);

			setProgress(nextProgress);
		}, progressUpdateInterval);
	}, [clear, direction, progressUpdateInterval]);

	const resume = useCallback(() => {
		if(remainingTimeRef.current > 0 && !inProgress) {
			start(remainingTimeRef.current);
		}
	}, [inProgress, start]);

	useEffect(() => () => clear(), [clear]);

	return {
		clear,
		inProgress,
		pause,
		progress,
		reset,
		resume,
		start
	};
};

useTimer.displayName = "useTimer";

export default useTimer;

"use client";

import { use, useCallback } from "react";

import { useAsync } from "@otuekong-portfolio/curio";

function useAudioPlayer(src: string | undefined) {
	const playAudioTask = useCallback(async () => {
		if(!src) {
			throw new Error("No audio source provided.");
		}

		return new Promise<void>((resolve, reject) => {
			const audio = new Audio(src);

			audio.onended = () => resolve();
			audio.onerror = (_) => reject(new Error("Audio playback failed"));

			audio.play().catch((err) => {
				reject(err instanceof Error ? err : new Error(String(err)));
			});
		});
	}, [src]);

	const { execute, isLoading, error } = useAsync<void, []>(playAudioTask, {
		manual: true
	});

	return {
		error,
		isPlaying: isLoading,
		play: execute
	};
}

useAudioPlayer.displayName = "useAudioPlayer";

export default useAudioPlayer;

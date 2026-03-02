import { useEffect, useState } from "react";

type ThemeColors = {
	bg: string;
	gridPrimary: string;
	gridSection: string;
	isDark: boolean;
};

function isDarkTheme(): boolean {
	if (typeof window === "undefined") return false;
	return document.documentElement.getAttribute("data-theme") === "dark";
}

function resolveColors(): ThemeColors {
	const dark = isDarkTheme();
	return {
		bg: "#0d1b2a",
		gridPrimary: dark ? "#2a3a4a" : "#d0d0d0",
		gridSection: dark ? "#1a2a3a" : "#e8e8e8",
		isDark: dark,
	};
}

export function useThemeColors(): ThemeColors {
	const [colors, setColors] = useState<ThemeColors>(resolveColors);

	useEffect(() => {
		const update = () => setColors(resolveColors());
		document.addEventListener("theme-change", update);
		return () => document.removeEventListener("theme-change", update);
	}, []);

	return colors;
}

import React from "react"

type FilesContextProps = {
	file: File | null
	onSelectFile(file: File): void
	onResetFile(): void
}

export const FileContext = React.createContext<FilesContextProps | null>(null)

export function FileProvider({ children }: { children: React.ReactNode }) {
	const [file, setFile] = React.useState<File | null>(null)

	function onResetFile() {
		setFile(null)
	}

	return (
		<FileContext.Provider value={{ file, onSelectFile: setFile, onResetFile }}>
			{children}
		</FileContext.Provider>
	)
}

export function useFilesContext() {
	const context = React.useContext(FileContext)

	if (!context) {
		throw new Error("useFilesContext cant be outside FileProvider")
	}

	return context
}

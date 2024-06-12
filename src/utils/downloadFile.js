import axios from 'axios';

const downloadFile = async (filename) => {
	try {
		const response = await axios.get(`/api/download/${filename}`, {
			responseType: 'blob',
		});
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
	} catch (error) {
		console.error('Failed to download the file', error);
	}
};

export default downloadFile;

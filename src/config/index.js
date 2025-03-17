const config = {
  api_host_dev : import.meta.env.VITE_API_HOST_DEV,
  api_host_prod : import.meta.env.VITE_API_HOST_PROD,
  image_base_url: import.meta.env.VITE_IMAGE_BASE_URL,
}

export { config }

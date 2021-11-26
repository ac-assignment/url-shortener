const toastWarn = document.getElementById('warn-toast')
const isDisplay = toastWarn.getAttribute('data-isDisplay')
if (isDisplay === 'true') {
  const toast = new bootstrap.Toast(toastWarn)
  toast.show()
}
const toastWarn = document.getElementById('toast-warn')
const hasError = toastWarn.getAttribute('data-hasError')

if (hasError === 'true') {
  const toast = new bootstrap.Toast(toastWarn)
  toast.show()
}

export function useSwalSuccess(message){
    Swal.fire({
        position: 'top-end',
        toast: true,
        animation: false,
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 4000
    })
}

export function useSwalError(message){
    Swal.fire({
        position: 'top-end',
        toast: true,
        animation: false,
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 4000
    })
}

export function useSwalConfirm(message, callback){
    Swal.fire({
        html: message,
        icon: 'warning',
        buttonsStyling: true,
        showCancelButton: true,
        confirmButtonText: 'Oui, continuer.',
        cancelButtonText: 'Non, fermer.',
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-dancer',
        },
        // position: 'top-end',
        // toast: true,
        // animation: false,
        // title: message,
        // showConfirmButton: false,
        // timer: 4000
    }).then((result)=>{
        if(result.isConfirmed){
            callback()
        }else if(result.isDenied){
            Swal.close();
        }
    });
}

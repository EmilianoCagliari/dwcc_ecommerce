


class Cliente {

    constructor( nombreCompleto, dni, direccion, telefono, nacimiento, unidadFamiliar, nroTarjeta, club, premium ){
        this.nombreCompleto = nombreCompleto;
        this.dni = dni;
        this.direccion = direccion;
        this.telefono = telefono;
        this.nacimiento = nacimiento;
        this.unidadFamiliar = unidadFamiliar;
        this.nroTarjeta = nroTarjeta;
        this.club = club,
        this.premium = premium
    }

}

class Producto {
    
    constructor( title, price, img_url, off2x1, club, premium, category ) {
        this.title = title;
        this.price = price;
        this.img_url = img_url;
        this.off2x1 = off2x1;
        this.club = club;
        this.premium = premium;
        this.category = category;
    }


}



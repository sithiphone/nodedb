exports.IsAdmin = (req, res, next) => {
    try{
        if(req.user.role !== 'admin') {
            err = new Error('ເຈົ້າບໍ່ມີສິດທິໃຫ້ໃຊ້ຟັງຊັ່ນນີ້');
            err.statusCode = 403;
            return next(err);
        }
        return next();
    }catch(err){
        return next(err);
    }
}

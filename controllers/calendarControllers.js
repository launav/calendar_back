const Event = require('../models/EventModel');


const getEvents = async (req, res) => {

    const events = await Event.find().populate('user', 'name email',)

    res.status(200).json({
        ok: true,
        msg: 'recoger evento',
        events
    });

};

const createEvent = async (req, res) => {

    //INSTANCIAR MODELO EVENT

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const newEvent = await event.save();

        return res.status(201).json({
            ok: true,
            msg: 'creando evento',
            newEvent
        });

    } catch (error) {

        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });

    };

};


const updateEvents = async (req, res) => {

    const eventId = req.params.id;
    const uid = req.uid;
    // console.log(req.params.id)

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay eventos con ese id'
            });
        };

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes privilegios'
            });
        };

        const newEvent = {
            ...req.body,
            user: uid
        };

        const editedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        return res.status(200).json({
            ok: true,
            msg: 'actualizando evento',
            editedEvent
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }


};


const deleteEvent = async (req, res) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No hay eventos con ese id'
            });
        };

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes privilegios'
            });
        };


        const deletedEvent = await Event.findByIdAndRemove(eventId, { new: true });

        return res.status(200).json({
            ok: true,
            msg: 'evento eliminado',
            deletedEvent
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

};

module.exports = {
    getEvents,
    createEvent,
    updateEvents,
    deleteEvent
}
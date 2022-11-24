const {response} = require('express');
const EventModel = require('../models/EventModel');

const getEvents = async(req, res = response ) => {

    const events = await EventModel.find().populate('user', 'name');

    res.json({
        ok: true,
        events,
    });
}

const createEvent = async(req, res = response ) => {

    const evento = new EventModel(req.body);

    try {

        evento.user = req.uid;

        const newEvent = await evento.save();
        res.status(201).json({
            ok: true,
            event: newEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'MongoDB unexpected error',
        });
    }
}

const updateEvent = async(req, res = response ) => {

    const eventId = req.params.id;

    try {
        
        const evento = await EventModel.findById(eventId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found',
            });
        }
            
        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You are not the creator of this event, you cannot update it',
            });
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updatedEvent = await EventModel.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.json({
            ok: true,
            event: updatedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'MongoDB unexpected error',
        });
    }
}

const deleteEvent = async(req, res = response ) => {

    const eventId = req.params.id;

    try {

        const evento = await EventModel.findById(eventId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found',
            });
        }
            
        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You are not the creator of this event, you cannot delete it',
            });
        }

        await EventModel.findByIdAndDelete(eventId);
        
        return res.json({
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'MongoDB unexpected error',
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};
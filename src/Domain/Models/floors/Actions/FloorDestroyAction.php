<?php

namespace Domain\Models\floors\Actions;

use Domain\Models\floors\Floor;

class FloorDestroyAction
{
    public function __invoke(Floor $floor): void
    {
        $floor->delete();
    }
}

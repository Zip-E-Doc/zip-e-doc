package com.zipedoc.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.zipedoc.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SharedUserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SharedUser.class);
        SharedUser sharedUser1 = new SharedUser();
        sharedUser1.setId(1L);
        SharedUser sharedUser2 = new SharedUser();
        sharedUser2.setId(sharedUser1.getId());
        assertThat(sharedUser1).isEqualTo(sharedUser2);
        sharedUser2.setId(2L);
        assertThat(sharedUser1).isNotEqualTo(sharedUser2);
        sharedUser1.setId(null);
        assertThat(sharedUser1).isNotEqualTo(sharedUser2);
    }
}

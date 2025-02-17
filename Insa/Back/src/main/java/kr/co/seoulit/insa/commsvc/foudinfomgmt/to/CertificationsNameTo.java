package kr.co.seoulit.insa.commsvc.foudinfomgmt.to;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class CertificationsNameTo {
    private String certificationsCode, certificationsName;

    public String getCertificationsCode() {
        return certificationsCode;
    }

    public void setCertificationsCode(String certificationsCode) {
        this.certificationsCode = certificationsCode;
    }

    public String getCertificationsName() {
        return certificationsName;
    }

    public void setCertificationsName(String certificationsName) {
        this.certificationsName = certificationsName;
    }
}
